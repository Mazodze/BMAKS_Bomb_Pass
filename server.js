const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const crypto = require("crypto");
const QUESTIONS = require("./questions");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  maxHttpBufferSize: 5e6
});

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

const rooms = new Map();

// ==================================================
// GAME SETTINGS
// ==================================================

const BOMB_SECONDS = 60;
const MAX_PLAYERS = 8;

// ==================================================
// ROOM HELPERS
// ==================================================

function roomCode() {
  let code;

  do {
    code = crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase();
  } while (rooms.has(code));

  return code;
}

function cleanName(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 20);
}

function activePlayers(room) {
  return [...room.players.values()]
    .filter(player => !player.eliminated);
}

function publicPlayers(room) {
  return [...room.players.values()].map(player => ({
    id: player.id,
    name: player.name,
    ready: player.ready,
    eliminated: player.eliminated
  }));
}

function publicRoom(room) {
  return {
    code: room.code,
    hostId: room.hostId,
    status: room.status,
    round: room.round,
    players: publicPlayers(room)
  };
}

function emitRoom(room) {
  io.to(room.code).emit(
    "room:update",
    publicRoom(room)
  );
}

// ==================================================
// RANDOM HELPERS
// ==================================================

function shuffle(list) {
  const copy = [...list];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [copy[i], copy[j]] = [
      copy[j],
      copy[i]
    ];
  }

  return copy;
}

function chooseQuestion(room) {
  if (
    !Array.isArray(QUESTIONS) ||
    QUESTIONS.length === 0
  ) {
    throw new Error(
      "No questions are available."
    );
  }

  if (
    room.usedQuestions.length >=
    QUESTIONS.length
  ) {
    room.usedQuestions = [];
  }

  let index;

  do {
    index = Math.floor(
      Math.random() * QUESTIONS.length
    );
  } while (
    room.usedQuestions.includes(index) &&
    room.usedQuestions.length < QUESTIONS.length
  );

  room.usedQuestions.push(index);

  return QUESTIONS[index];
}

// ==================================================
// TIMER
// ==================================================

function clearRoomTimer(room) {
  if (room.timer) {
    clearTimeout(room.timer);
    room.timer = null;
  }

  if (room.interval) {
    clearInterval(room.interval);
    room.interval = null;
  }
}

// ==================================================
// SEND CURRENT GAME STATE
// ==================================================

function sendGameState(room) {
  const holder = room.players.get(
    room.bombHolder
  );

  if (!holder || !room.question) {
    return;
  }

  const elapsed =
    Date.now() - room.bombStartedAt;

  const remaining = Math.max(
    0,
    BOMB_SECONDS * 1000 - elapsed
  );

  io.to(room.code).emit(
    "game:state",
    {
      round: room.round,

      holderId: holder.id,

      holderName: holder.name,

      question: room.question.q,

      answers: room.question.a,

      remainingMs: remaining,

      players: publicPlayers(room)
    }
  );
}

// ==================================================
// START NEW BOMB CYCLE
// ==================================================

function startBombCycle(room, holderId) {
  clearRoomTimer(room);

  const active =
    activePlayers(room);

  if (active.length <= 1) {
    finishGame(
      room,
      active[0]
    );

    return;
  }

  room.bombHolder =
    holderId;

  room.question =
    chooseQuestion(room);

  room.bombStartedAt =
    Date.now();

  sendGameState(room);

  room.interval =
    setInterval(() => {

      const remaining =
        Math.max(
          0,
          BOMB_SECONDS * 1000 -
          (
            Date.now() -
            room.bombStartedAt
          )
        );

      io.to(room.code).emit(
        "game:tick",
        {
          remainingMs:
            remaining
        }
      );

    }, 100);

  room.timer =
    setTimeout(() => {

      explode(
        room,
        room.bombHolder,
        "TIME"
      );

    }, BOMB_SECONDS * 1000 + 80);
}

// ==================================================
// NEW QUESTION
// ==================================================

function newQuestion(room) {
  room.question =
    chooseQuestion(room);

  sendGameState(room);
}

// ==================================================
// START GAME
// ==================================================

function startGame(room) {
  clearRoomTimer(room);

  room.status =
    "game";

  room.round =
    1;

  room.usedQuestions =
    [];

  room.winnerId =
    null;

  room.bombHolder =
    null;

  room.question =
    null;

  room.bombStartedAt =
    0;

  room.players.forEach(
    player => {

      player.eliminated =
        false;

      player.ready =
        false;
    }
  );

  const active =
    shuffle(
      activePlayers(room)
    );

  if (active.length < 2) {
    finishGame(
      room,
      active[0]
    );

    return;
  }

  startBombCycle(
    room,
    active[0].id
  );

  emitRoom(room);
}

// ==================================================
// ELIMINATE PLAYER
// ==================================================

function eliminate(
  room,
  playerId,
  reason
) {
  const player =
    room.players.get(
      playerId
    );

  if (
    !player ||
    player.eliminated
  ) {
    return;
  }

  player.eliminated =
    true;

  io.to(room.code).emit(
    "game:boom",
    {
      playerId,

      playerName:
        player.name,

      reason
    }
  );

  emitRoom(room);
}

// ==================================================
// NEXT HOLDER
// ==================================================

function nextHolder(
  room,
  oldHolderId
) {
  const active =
    activePlayers(room);

  if (active.length <= 1) {
    finishGame(
      room,
      active[0]
    );

    return;
  }

  const index =
    active.findIndex(
      player =>
        player.id ===
        oldHolderId
    );

  const next =
    active[
      (index + 1 + active.length) %
      active.length
    ];

  room.round++;

  room.bombHolder =
    next.id;

  room.question =
    chooseQuestion(room);

  sendGameState(room);
}

// ==================================================
// BOMB EXPLOSION
// ==================================================

function explode(
  room,
  holderId,
  reason
) {
  if (
    room.status !== "game" ||
    room.bombHolder !== holderId
  ) {
    return;
  }

  clearRoomTimer(room);

  eliminate(
    room,
    holderId,
    reason
  );

  setTimeout(() => {

    if (!rooms.has(room.code)) {
      return;
    }

    if (room.status !== "game") {
      return;
    }

    const active =
      activePlayers(room);

    if (active.length <= 1) {
      finishGame(
        room,
        active[0]
      );

      return;
    }

    const next =
      active[
        Math.floor(
          Math.random() *
          active.length
        )
      ];

    room.round++;

    startBombCycle(
      room,
      next.id
    );

    emitRoom(room);

  }, 1500);
}

// ==================================================
// FINISH GAME
// ==================================================

function finishGame(
  room,
  winner
) {
  clearRoomTimer(room);

  room.status =
    "finished";

  room.bombHolder =
    null;

  room.question =
    null;

  room.bombStartedAt =
    0;

  room.winnerId =
    winner
      ? winner.id
      : null;

  io.to(room.code).emit(
    "game:winner",
    {
      winner:
        winner
          ? {
              id: winner.id,
              name: winner.name
            }
          : null,

      players:
        publicPlayers(room)
    }
  );

  emitRoom(room);
}

// ==================================================
// RESET GAME TO LOBBY
// ==================================================
//
// IMPORTANT:
//
// - Players stay in the same room.
// - The room code stays the same.
// - Nobody has to enter the code again.
// - Everyone goes back to the lobby.
// - Everyone becomes NOT READY.
// - The host remains the host.
// - Any player can press PLAY AGAIN.
//

function resetGameToLobby(room) {
  clearRoomTimer(room);

  room.status =
    "lobby";

  room.round =
    0;

  room.winnerId =
    null;

  room.bombHolder =
    null;

  room.question =
    null;

  room.bombStartedAt =
    0;

  room.usedQuestions =
    [];

  room.players.forEach(
    player => {

      player.ready =
        false;

      player.eliminated =
        false;
    }
  );

  // Tell everyone to update their screen.
  io.to(room.code).emit(
    "lobby:returned",
    {
      code:
        room.code
    }
  );

  // Send the new lobby state.
  emitRoom(room);
}

// ==================================================
// LEAVE ROOM
// ==================================================

function leaveRoom(socket) {
  const code =
    socket.data.roomCode;

  if (!code) {
    return;
  }

  const room =
    rooms.get(code);

  socket.data.roomCode =
    null;

  if (!room) {
    return;
  }

  const wasHolder =
    room.bombHolder ===
    socket.id;

  room.players.delete(
    socket.id
  );

  socket.leave(code);

  if (room.players.size === 0) {

    clearRoomTimer(room);

    rooms.delete(code);

    return;
  }

  if (
    room.hostId ===
    socket.id
  ) {

    const nextHost =
      room.players
        .values()
        .next()
        .value;

    if (nextHost) {
      room.hostId =
        nextHost.id;
    }
  }

  if (
    room.status ===
    "game"
  ) {

    const active =
      activePlayers(room);

    if (active.length <= 1) {

      clearRoomTimer(room);

      finishGame(
        room,
        active[0]
      );

    } else if (wasHolder) {

      room.bombHolder =
        active[0].id;

      room.question =
        chooseQuestion(room);

      sendGameState(room);

    } else {

      sendGameState(room);
    }
  }

  emitRoom(room);
}

// ==================================================
// SOCKET CONNECTION
// ==================================================

io.on(
  "connection",
  socket => {

    // ==============================================
    // CREATE ROOM
    // ==============================================

    socket.on(
      "room:create",
      ({ name } = {}) => {

        leaveRoom(socket);

        const playerName =
          cleanName(name);

        if (
          playerName.length < 2
        ) {

          return socket.emit(
            "error:message",
            "Enter a name with at least 2 characters."
          );
        }

        const code =
          roomCode();

        const room = {

          code,

          hostId:
            socket.id,

          status:
            "lobby",

          round:
            0,

          players:
            new Map(),

          bombHolder:
            null,

          question:
            null,

          bombStartedAt:
            0,

          timer:
            null,

          interval:
            null,

          usedQuestions:
            [],

          winnerId:
            null
        };

        room.players.set(
          socket.id,
          {
            id:
              socket.id,

            name:
              playerName,

            ready:
              false,

            eliminated:
              false
          }
        );

        rooms.set(
          code,
          room
        );

        socket.join(code);

        socket.data.roomCode =
          code;

        socket.emit(
          "room:created",
          {
            code
          }
        );

        emitRoom(room);
      }
    );

    // ==============================================
    // JOIN ROOM
    // ==============================================

    socket.on(
      "room:join",
      ({ name, code } = {}) => {

        leaveRoom(socket);

        const playerName =
          cleanName(name);

        const normalized =
          String(code || "")
            .trim()
            .toUpperCase();

        const room =
          rooms.get(
            normalized
          );

        if (
          playerName.length < 2
        ) {

          return socket.emit(
            "error:message",
            "Enter a name with at least 2 characters."
          );
        }

        if (
          !/^[A-Z0-9]{4}$/.test(
            normalized
          )
        ) {

          return socket.emit(
            "error:message",
            "Room codes are 4 characters."
          );
        }

        if (!room) {

          return socket.emit(
            "error:message",
            "Room not found."
          );
        }

        if (
          room.status !==
          "lobby"
        ) {

          return socket.emit(
            "error:message",
            "That game has already started."
          );
        }

        if (
          room.players.size >=
          MAX_PLAYERS
        ) {

          return socket.emit(
            "error:message",
            "That room is full."
          );
        }

        room.players.set(
          socket.id,
          {
            id:
              socket.id,

            name:
              playerName,

            ready:
              false,

            eliminated:
              false
          }
        );

        socket.join(
          normalized
        );

        socket.data.roomCode =
          normalized;

        socket.emit(
          "room:joined",
          {
            code:
              normalized
          }
        );

        emitRoom(room);
      }
    );

    // ==============================================
    // READY
    // ==============================================

    socket.on(
      "player:ready",
      () => {

        const room =
          rooms.get(
            socket.data.roomCode
          );

        if (
          !room ||
          room.status !==
          "lobby"
        ) {
          return;
        }

        const player =
          room.players.get(
            socket.id
          );

        if (!player) {
          return;
        }

        player.ready =
          !player.ready;

        emitRoom(room);
      }
    );

    // ==============================================
    // START GAME
    // ==============================================

    socket.on(
      "game:start",
      () => {

        const room =
          rooms.get(
            socket.data.roomCode
          );

        if (
          !room ||
          room.status !==
          "lobby"
        ) {
          return;
        }

        if (
          room.hostId !==
          socket.id
        ) {

          return socket.emit(
            "error:message",
            "Only the host can start."
          );
        }

        if (
          room.players.size < 2
        ) {

          return socket.emit(
            "error:message",
            "At least 2 players are required."
          );
        }

        if (
          ![
            ...room.players.values()
          ].every(
            player =>
              player.ready
          )
        ) {

          return socket.emit(
            "error:message",
            "Everyone must be ready."
          );
        }

        io.to(
          room.code
        ).emit(
          "game:starting"
        );

        setTimeout(() => {

          if (
            rooms.has(
              room.code
            ) &&
            room.status ===
            "lobby"
          ) {

            startGame(room);
          }

        }, 2500);
      }
    );

    // ==============================================
    // ANSWER QUESTION
    // ==============================================

    socket.on(
      "game:answer",
      ({ answerIndex } = {}) => {

        const room =
          rooms.get(
            socket.data.roomCode
          );

        if (
          !room ||
          room.status !==
          "game"
        ) {
          return;
        }

        if (
          room.bombHolder !==
          socket.id
        ) {
          return;
        }

        const answer =
          Number(answerIndex);

        if (
          !Number.isInteger(
            answer
          ) ||
          answer < 0 ||
          answer > 3
        ) {
          return;
        }

        if (!room.question) {
          return;
        }

        const elapsed =
          Date.now() -
          room.bombStartedAt;

        if (
          elapsed >=
          BOMB_SECONDS * 1000
        ) {

          return explode(
            room,
            socket.id,
            "TIME"
          );
        }

        // ==========================================
        // CORRECT ANSWER
        // ==========================================

        if (
          answer ===
          room.question.c
        ) {

          const player =
            room.players.get(
              socket.id
            );

          if (!player) {
            return;
          }

          io.to(
            room.code
          ).emit(
            "game:correct",
            {
              playerId:
                socket.id,

              playerName:
                player.name
            }
          );

          setTimeout(() => {

            if (
              !rooms.has(
                room.code
              ) ||
              room.status !==
              "game"
            ) {
              return;
            }

            nextHolder(
              room,
              socket.id
            );

          }, 700);

        }

        // ==========================================
        // WRONG ANSWER
        // ==========================================

        else {

          newQuestion(room);
        }
      }
    );

    // ==============================================
    // PLAY AGAIN
    // ==============================================
    //
    // ANY PLAYER CAN PRESS PLAY AGAIN.
    //
    // The room does NOT get deleted.
    // Players do NOT leave.
    // The room code stays the same.
    //
    // Everyone is sent back to the lobby.
    //
    // ==============================================

    socket.on(
      "game:playAgain",
      () => {

        const room =
          rooms.get(
            socket.data.roomCode
          );

        if (!room) {
          return;
        }

        if (
          room.status !==
          "finished"
        ) {
          return;
        }

        resetGameToLobby(room);
      }
    );

    // ==============================================
    // LEAVE ROOM
    // ==============================================

    socket.on(
      "room:leave",
      () => {
        leaveRoom(socket);
      }
    );

    // ==============================================
    // DISCONNECT
    // ==============================================

    socket.on(
      "disconnect",
      () => {
        leaveRoom(socket);
      }
    );
  }
);

// ==================================================
// HEALTH CHECK
// ==================================================

app.get(
  "/health",
  (req, res) => {

    res.json({
      ok:
        true,

      game:
        "BMAKS Bomb Pass",

      rooms:
        rooms.size,

      questions:
        Array.isArray(QUESTIONS)
          ? QUESTIONS.length
          : 0
    });
  }
);

// ==================================================
// START SERVER
// ==================================================

server.listen(
  PORT,
  () => {

    console.log(
      `BMAKS Bomb Pass running on port ${PORT}`
    );

    console.log(
      `${QUESTIONS.length} questions loaded.`
    );
  }
);