const socket = io();

const $ = id => document.getElementById(id);

let myId = null;
let room = null;

let tickTimer = null;
let startTimer = null;

let currentRemaining = 60000;

let answering = false;

const screens = {
  home: $("home"),
  lobby: $("lobby"),
  game: $("game"),
  boom: $("boom"),
  winner: $("winner"),
  starting: $("starting")
};

// ==================================================
// CONNECTION
// ==================================================

socket.on("connect", () => {
  myId = socket.id;
});

// ==================================================
// SCREEN CONTROL
// ==================================================

function show(name) {
  Object.values(screens).forEach(screen => {
    if (screen) {
      screen.classList.remove("active");
    }
  });

  if (screens[name]) {
    screens[name].classList.add("active");
  }
}

// ==================================================
// ERROR
// ==================================================

function error(el, msg) {
  if (el) {
    el.textContent = msg || "";
  }
}

// ==================================================
// TOAST
// ==================================================

let toastTimer = null;

function toast(msg) {
  const el = $("toast");

  if (!el) {
    return;
  }

  el.textContent = msg;

  el.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    el.classList.remove("show");
  }, 2500);
}

// ==================================================
// PLAYER NAME
// ==================================================

function getPlayerName() {
  const input = $("name");

  if (!input) {
    return "";
  }

  return input.value
    .trim()
    .replace(/\s+/g, " ");
}

// ==================================================
// CREATE ROOM
// ==================================================

$("create").onclick = () => {
  const playerName = getPlayerName();

  if (playerName.length < 2) {
    return error(
      $("homeError"),
      "Enter a name with at least 2 characters."
    );
  }

  error($("homeError"), "");

  socket.emit("room:create", {
    name: playerName
  });
};

// ==================================================
// JOIN ROOM
// ==================================================

$("join").onclick = () => {
  const playerName = getPlayerName();

  const code = $("code")
    .value
    .trim()
    .toUpperCase();

  if (playerName.length < 2) {
    return error(
      $("homeError"),
      "Enter a name with at least 2 characters."
    );
  }

  if (!/^[A-Z0-9]{4}$/.test(code)) {
    return error(
      $("homeError"),
      "Enter the 4-character room code."
    );
  }

  error($("homeError"), "");

  socket.emit("room:join", {
    name: playerName,
    code: code
  });
};

// ==================================================
// INPUT CONTROLS
// ==================================================

$("code").oninput = event => {
  event.target.value = event.target.value
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 4)
    .toUpperCase();
};

$("name").onkeydown = event => {
  if (event.key === "Enter") {
    $("create").click();
  }
};

$("code").onkeydown = event => {
  if (event.key === "Enter") {
    $("join").click();
  }
};

// ==================================================
// ROOM CREATED
// ==================================================

socket.on("room:created", ({ code }) => {
  show("lobby");

  $("roomCode").textContent = code;

  toast("Room created: " + code);
});

// ==================================================
// ROOM JOINED
// ==================================================

socket.on("room:joined", ({ code }) => {
  show("lobby");

  $("roomCode").textContent = code;

  toast("Joined room: " + code);
});

// ==================================================
// ROOM UPDATE
// ==================================================

socket.on("room:update", state => {
  room = state;

  if ($("roomCode")) {
    $("roomCode").textContent = state.code;
  }

  if ($("count")) {
    $("count").textContent =
      state.players.length;
  }

  renderLobby(state);

  if (typeof renderScore === "function") {
    renderScore(state.players);
  }

  // ----------------------------------------------
  // ROOM RETURNED TO LOBBY
  // ----------------------------------------------

  if (state.status === "lobby") {
    clearInterval(tickTimer);

    answering = false;

    currentRemaining = 60000;

    updateTimer(60000);

    if (
      screens.winner &&
      screens.winner.classList.contains("active")
    ) {
      show("lobby");
    }

    if (
      screens.boom &&
      screens.boom.classList.contains("active")
    ) {
      show("lobby");
    }

    if (
      screens.game &&
      screens.game.classList.contains("active")
    ) {
      show("lobby");
    }

    if (
      screens.starting &&
      screens.starting.classList.contains("active")
    ) {
      show("lobby");
    }
  }
});

// ==================================================
// RENDER LOBBY
// ==================================================

function renderLobby(state) {
  const list = $("players");

  if (!list) {
    return;
  }

  list.innerHTML = "";

  state.players.forEach(player => {
    const row =
      document.createElement("div");

    row.className = "player";

    // ----------------------------------------------
    // AVATAR
    // ----------------------------------------------

    const avatar =
      document.createElement("div");

    avatar.className = "avatar";

    avatar.textContent =
      player.name
        ? player.name[0].toUpperCase()
        : "?";

    // ----------------------------------------------
    // PLAYER INFO
    // ----------------------------------------------

    const playerInfo =
      document.createElement("div");

    playerInfo.className = "pi";

    const playerName =
      document.createElement("div");

    playerName.className = "pn";

    playerName.textContent =
      player.name;

    // ----------------------------------------------
    // HOST
    // ----------------------------------------------

    if (player.id === state.hostId) {
      const host =
        document.createElement("span");

      host.className = "host";

      host.textContent = "HOST";

      playerName.appendChild(host);
    }

    // ----------------------------------------------
    // READY STATUS
    // ----------------------------------------------

    const status =
      document.createElement("div");

    status.className =
      player.ready
        ? "status ready"
        : "status";

    status.textContent =
      player.ready
        ? "READY"
        : "NOT READY";

    playerInfo.append(
      playerName,
      status
    );

    // ----------------------------------------------
    // READY DOT
    // ----------------------------------------------

    const dot =
      document.createElement("div");

    dot.className =
      player.ready
        ? "dot ready"
        : "dot";

    row.append(
      avatar,
      playerInfo,
      dot
    );

    list.appendChild(row);
  });

  // ----------------------------------------------
  // CURRENT PLAYER
  // ----------------------------------------------

  const me =
    state.players.find(
      player => player.id === myId
    );

  if ($("ready")) {
    $("ready").hidden =
      state.status !== "lobby";
  }

  // ----------------------------------------------
  // HOST START BUTTON
  // ----------------------------------------------

  if ($("start")) {
    $("start").hidden =
      !(
        state.hostId === myId &&
        state.status === "lobby"
      );
  }

  if ($("ready")) {
    $("ready").textContent =
      me && me.ready
        ? "✓ READY"
        : "I'M READY";
  }

  if (state.hostId === myId && $("start")) {
    const everyoneReady =
      state.players.length >= 2 &&
      state.players.every(
        player => player.ready
      );

    $("start").disabled =
      !everyoneReady;

    $("start").textContent =
      everyoneReady
        ? "START GAME"
        : "WAITING FOR PLAYERS";
  }
}

// ==================================================
// READY
// ==================================================

$("ready").onclick = () => {
  if (!room) {
    return;
  }

  if (room.status !== "lobby") {
    return;
  }

  socket.emit("player:ready");
};

// ==================================================
// START GAME
// ==================================================

$("start").onclick = () => {
  if (!room) {
    return;
  }

  if (room.status !== "lobby") {
    return;
  }

  if (room.hostId !== myId) {
    return;
  }

  socket.emit("game:start");
};

// ==================================================
// LEAVE ROOM
// ==================================================

$("leave").onclick = () => {
  socket.emit("room:leave");

  clearInterval(tickTimer);
  clearInterval(startTimer);

  room = null;

  answering = false;

  currentRemaining = 60000;

  updateTimer(60000);

  show("home");
};

// ==================================================
// GAME STARTING
// ==================================================

socket.on("game:starting", () => {
  clearInterval(startTimer);

  show("starting");

  let number = 3;

  $("startNumber").textContent =
    number;

  startTimer =
    setInterval(() => {
      number--;

      if (number <= 0) {
        clearInterval(startTimer);

        $("startNumber").textContent =
          "💣";

        return;
      }

      $("startNumber").textContent =
        number;

    }, 800);
});

// ==================================================
// GAME STATE
// ==================================================

socket.on("game:state", state => {
  clearInterval(tickTimer);

  show("game");

  answering = false;

  // ----------------------------------------------
  // STORE ROOM GAME STATUS LOCALLY
  // ----------------------------------------------

  if (room) {
    room.status = "game";
  }

  // ----------------------------------------------
  // ROUND
  // ----------------------------------------------

  $("round").textContent =
    state.round;

  // ----------------------------------------------
  // BOMB HOLDER
  // ----------------------------------------------

  if (state.holderId === myId) {
    $("holder").textContent =
      "🔥 YOU HAVE THE BOMB";
  } else {
    $("holder").textContent =
      "💣 " +
      state.holderName +
      " HAS THE BOMB";
  }

  // ----------------------------------------------
  // QUESTION
  // ----------------------------------------------

  $("question").textContent =
    state.question;

  // ----------------------------------------------
  // TIMER
  // ----------------------------------------------

  currentRemaining =
    Number(state.remainingMs);

  if (
    !Number.isFinite(currentRemaining)
  ) {
    currentRemaining = 60000;
  }

  updateTimer(
    currentRemaining
  );

  // ----------------------------------------------
  // ANSWERS
  // ----------------------------------------------

  renderAnswers(
    state.answers || []
  );

  // ----------------------------------------------
  // SCORE
  // ----------------------------------------------

  if (typeof renderScore === "function") {
    renderScore(
      state.players || []
    );
  }

  // ----------------------------------------------
  // START LOCAL DISPLAY
  // ----------------------------------------------

  startLocalTimer();
});

// ==================================================
// RENDER ANSWERS
// ==================================================

function renderAnswers(answers) {
  const box = $("answers");

  if (!box) {
    return;
  }

  box.innerHTML = "";

  answers.forEach(
    (answerText, index) => {
      const button =
        document.createElement("button");

      button.className = "answer";

      button.textContent =
        String.fromCharCode(65 + index) +
        ") " +
        answerText;

      button.onclick = () => {
        answer(index);
      };

      box.appendChild(button);
    }
  );
}

// ==================================================
// ANSWER
// ==================================================

function answer(index) {
  if (answering) {
    return;
  }

  if (!room) {
    return;
  }

  if (room.status !== "game") {
    return;
  }

  // ----------------------------------------------
  // ONLY THE BOMB HOLDER CAN ANSWER
  // ----------------------------------------------

  if (
    room.bombHolder &&
    room.bombHolder !== myId
  ) {
    return;
  }

  answering = true;

  document
    .querySelectorAll(".answer")
    .forEach(button => {
      button.disabled = true;
    });

  socket.emit(
    "game:answer",
    {
      answerIndex: index
    }
  );
}

// ==================================================
// TIMER
// ==================================================
//
// IMPORTANT:
//
// The SERVER is the source of truth.
//
// Every game:tick from server updates
// currentRemaining.
//
// We use Date.now() locally between
// server ticks so the timer moves smoothly.
//
// ==================================================

function startLocalTimer() {
  clearInterval(tickTimer);

  let lastServerTime =
    Date.now();

  let lastServerRemaining =
    currentRemaining;

  tickTimer =
    setInterval(() => {
      const now =
        Date.now();

      const elapsed =
        now -
        lastServerTime;

      const remaining =
        Math.max(
          0,
          lastServerRemaining -
          elapsed
        );

      updateTimer(
        remaining
      );

    }, 50);

  updateTimer(
    currentRemaining
  );
}

// ==================================================
// SERVER TIMER TICK
// ==================================================

socket.on(
  "game:tick",
  data => {
    if (!data) {
      return;
    }

    const remaining =
      Number(data.remainingMs);

    if (
      !Number.isFinite(remaining)
    ) {
      return;
    }

    currentRemaining =
      Math.max(
        0,
        remaining
      );

    updateTimer(
      currentRemaining
    );
  }
);

// ==================================================
// TIMER DISPLAY
// ==================================================

function updateTimer(ms) {
  const timer =
    $("timer");

  if (!timer) {
    return;
  }

  const safeMs =
    Math.max(
      0,
      Number(ms) || 0
    );

  const seconds =
    Math.ceil(
      safeMs / 1000
    );

  timer.textContent =
    "00:" +
    String(seconds)
      .padStart(2, "0");

  const danger =
    seconds <= 3;

  timer.classList.toggle(
    "danger",
    danger
  );

  if ($("danger")) {
    $("danger")
      .classList
      .toggle(
        "on",
        danger
      );
  }

  if ($("bomb")) {
    if (danger) {
      const scale =
        1 +
        (3 - seconds) *
        0.08;

      const rotation =
        Math.sin(
          Date.now() / 50
        ) * 4;

      $("bomb").style.transform =
        `scale(${scale}) rotate(${rotation}deg)`;

    } else {
      $("bomb").style.transform =
        "";
    }
  }
}

// ==================================================
// CORRECT ANSWER
// ==================================================

socket.on(
  "game:correct",
  data => {

    if (data.playerId === myId) {
      $("gameMessage").textContent =
        "✓ Correct! Passing the bomb...";
    } else {
      $("gameMessage").textContent =
        "✓ " +
        data.playerName +
        " answered correctly.";
    }

    document
      .querySelectorAll(".answer")
      .forEach(button => {
        button.disabled = true;
      });
  }
);

// ==================================================
// BOOM
// ==================================================

socket.on(
  "game:boom",
  data => {

    clearInterval(tickTimer);

    answering = false;

    currentRemaining = 0;

    updateTimer(0);

    show("boom");

    $("boomTitle").textContent =
      "💥 BOOM!";

    if (data.playerId === myId) {

      $("boomText").textContent =
        "You were eliminated!";

    } else {

      $("boomText").textContent =
        data.playerName +
        " was eliminated!";
    }

    if (data.reason === "WRONG") {

      $("boomText").textContent +=
        " Wrong answer.";
    }

    if (data.reason === "TIME") {

      $("boomText").textContent +=
        " Time ran out.";
    }
  }
);

// ==================================================
// WINNER
// ==================================================

socket.on(
  "game:winner",
  data => {

    clearInterval(tickTimer);

    answering = false;

    show("winner");

    if (data.winner) {

      $("winnerName").textContent =
        data.winner.id === myId
          ? "YOU!"
          : data.winner.name;

    } else {

      $("winnerName").textContent =
        "NO WINNER";
    }

    if (typeof renderScore === "function") {
      renderScore(
        data.players || []
      );
    }
  }
);

// ==================================================
// PLAY AGAIN
// ==================================================
//
// ANY PLAYER CAN PRESS PLAY AGAIN.
//
// There is NO host restriction here.
//
// The server checks:
// room.status === "finished"
//
// The server then:
// 1. Resets the room.
// 2. Keeps the same room code.
// 3. Keeps all players.
// 4. Makes everyone NOT READY.
// 5. Returns everyone to the lobby.
//
// ==================================================

$("playAgain").onclick = () => {

  if (!room) {
    toast(
      "You are no longer in the room."
    );

    return;
  }

  if (room.status !== "finished") {
    return;
  }

  // ANY PLAYER IS ALLOWED TO DO THIS.
  socket.emit(
    "game:playAgain"
  );
};

// ==================================================
// LOBBY RETURNED
// ==================================================

socket.on(
  "lobby:returned",
  ({ code }) => {

    clearInterval(tickTimer);
    clearInterval(startTimer);

    answering = false;

    currentRemaining = 60000;

    updateTimer(60000);

    if (room) {
      room.status = "lobby";
      room.code = code;
    }

    if ($("roomCode")) {
      $("roomCode").textContent =
        code;
    }

    show("lobby");

    toast(
      "Back to the lobby."
    );
  }
);

// ==================================================
// MAIN MENU
// ==================================================

$("menu").onclick = () => {

  socket.emit(
    "room:leave"
  );

  clearInterval(tickTimer);
  clearInterval(startTimer);

  room = null;

  answering = false;

  currentRemaining = 60000;

  location.reload();
};

// ==================================================
// SERVER ERROR
// ==================================================

socket.on(
  "error:message",
  msg => {

    let active;

    if (
      screens.home &&
      screens.home.classList.contains("active")
    ) {
      active =
        $("homeError");
    } else {
      active =
        $("lobbyError");
    }

    error(
      active,
      msg
    );

    toast(msg);
  }
);

// ==================================================
// DISCONNECT
// ==================================================

socket.on(
  "disconnect",
  () => {

    clearInterval(tickTimer);
    clearInterval(startTimer);

    if (
      screens.home &&
      !screens.home.classList.contains("active")
    ) {
      toast(
        "Disconnected from server."
      );
    }
  }
);