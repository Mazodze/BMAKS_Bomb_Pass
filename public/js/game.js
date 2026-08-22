const socket = io();

const $ = id => document.getElementById(id);

let myId = null;
let room = null;

let tickTimer = null;
let startTimer = null;

let currentRemaining = 60000;

let answering = false;

// ==================================================
// VOICE NOTES
// ==================================================

let mediaRecorder = null;
let voiceChunks = [];
let voiceRecording = false;
let voiceRecordingCancelled = false;
let voiceRecordingTimer = null;
let voiceRecordingSeconds = 0;
let voiceStream = null;

const MAX_VOICE_SECONDS = 60;

// ==================================================
// CHAT
// ==================================================

let chatOpen = false;
let unreadMessages = 0;
let chatMessages = [];

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

  updateChatVisibility();
}

// ==================================================
// CHAT VISIBILITY
// ==================================================

function updateChatVisibility() {
  const launcher = $("chatLauncher");

  if (!launcher) {
    return;
  }

  const inRoom =
    room &&
    room.code;

  launcher.classList.toggle(
    "show",
    Boolean(inRoom)
  );
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

  updateChatVisibility();
});

// ==================================================
// ROOM JOINED
// ==================================================

socket.on("room:joined", ({ code }) => {
  show("lobby");

  $("roomCode").textContent = code;

  toast("Joined room: " + code);

  updateChatVisibility();
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

  updateChatVisibility();

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

    const avatar =
      document.createElement("div");

    avatar.className = "avatar";

    avatar.textContent =
      player.name
        ? player.name[0].toUpperCase()
        : "?";

    const playerInfo =
      document.createElement("div");

    playerInfo.className = "pi";

    const playerName =
      document.createElement("div");

    playerName.className = "pn";

    playerName.textContent =
      player.name;

    if (player.id === state.hostId) {

      const host =
        document.createElement("span");

      host.className = "host";

      host.textContent = "HOST";

      playerName.appendChild(host);
    }

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

  const me =
    state.players.find(
      player => player.id === myId
    );

  if ($("ready")) {

    $("ready").hidden =
      state.status !== "lobby";
  }

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

  if (
    state.hostId === myId &&
    $("start")
  ) {

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

  stopVoiceRecording();

  socket.emit("room:leave");

  clearInterval(tickTimer);
  clearInterval(startTimer);

  room = null;

  answering = false;

  currentRemaining = 60000;

  updateTimer(60000);

  closeChat();

  clearChat();

  updateChatVisibility();

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

  if (room) {

    room.status = "game";

    room.bombHolder =
      state.holderId;
  }

  $("round").textContent =
    state.round;

  if (state.holderId === myId) {

    $("holder").textContent =
      "🔥 YOU HAVE THE BOMB";

  } else {

    $("holder").textContent =
      "💣 " +
      state.holderName +
      " HAS THE BOMB";
  }

  $("question").textContent =
    state.question;

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

  renderAnswers(
    state.answers || []
  );

  if (typeof renderScore === "function") {

    renderScore(
      state.players || []
    );
  }

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

      button.className =
        "answer";

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

      room.status =
        "lobby";

      room.code =
        code;
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

  stopVoiceRecording();

  socket.emit(
    "room:leave"
  );

  clearInterval(tickTimer);

  clearInterval(startTimer);

  room = null;

  answering = false;

  currentRemaining = 60000;

  closeChat();

  clearChat();

  updateTimer(60000);

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

    stopVoiceRecording();

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

// ==================================================
// CHAT SYSTEM
// ==================================================

const chatLauncher =
  $("chatLauncher");

const chatPanel =
  $("chatPanel");

const chatClose =
  $("chatClose");

const chatMessagesBox =
  $("chatMessages");

const chatForm =
  $("chatForm");

const chatInput =
  $("chatInput");

const chatBadge =
  $("chatBadge");

// ==================================================
// OPEN CHAT
// ==================================================

function openChat() {

  if (!room) {
    return;
  }

  chatOpen = true;

  if (chatPanel) {

    chatPanel.classList.add(
      "open"
    );

    chatPanel.setAttribute(
      "aria-hidden",
      "false"
    );
  }

  unreadMessages = 0;

  updateChatBadge();

  setTimeout(() => {

    if (chatInput) {
      chatInput.focus();
    }

    scrollChatToBottom();

  }, 50);
}

// ==================================================
// CLOSE CHAT
// ==================================================

function closeChat() {

  chatOpen = false;

  if (chatPanel) {

    chatPanel.classList.remove(
      "open"
    );

    chatPanel.setAttribute(
      "aria-hidden",
      "true"
    );
  }
}

// ==================================================
// CHAT BUTTON
// ==================================================

if (chatLauncher) {

  chatLauncher.onclick = () => {

    if (chatOpen) {
      closeChat();
    } else {
      openChat();
    }

  };
}

// ==================================================
// CLOSE CHAT
// ==================================================

if (chatClose) {

  chatClose.onclick = () => {
    closeChat();
  };
}

// ==================================================
// CHAT FORM
// ==================================================

if (chatForm) {

  chatForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      sendChatMessage();
    }
  );
}

// ==================================================
// SEND TEXT MESSAGE
// ==================================================

function sendChatMessage() {

  if (!room) {
    return;
  }

  if (!chatInput) {
    return;
  }

  const message =
    chatInput.value.trim();

  if (!message) {
    return;
  }

  socket.emit(
    "chat:send",
    {
      message
    }
  );

  chatInput.value = "";

  chatInput.focus();
}

// ==================================================
// CHAT HISTORY
// ==================================================

socket.on(
  "chat:history",
  messages => {

    chatMessages =
      Array.isArray(messages)
        ? messages
        : [];

    renderChat();
  }
);

// ==================================================
// NEW TEXT CHAT MESSAGE
// ==================================================

socket.on(
  "chat:message",
  message => {

    if (!message) {
      return;
    }

    chatMessages.push(
      message
    );

    if (
      chatMessages.length >
      100
    ) {

      chatMessages =
        chatMessages.slice(-100);
    }

    renderChat();

    if (
      message.playerId !== myId &&
      !chatOpen
    ) {

      unreadMessages++;

      updateChatBadge();

      toast(
        message.playerName +
        ": " +
        message.message
      );
    }
  }
);

// ==================================================
// VOICE NOTE RECEIVED
// ==================================================

socket.on(
  "chat:voice",
  message => {

    if (!message) {
      return;
    }

    chatMessages.push(
      {
        ...message,
        type: "voice"
      }
    );

    if (
      chatMessages.length >
      100
    ) {

      chatMessages =
        chatMessages.slice(-100);
    }

    renderChat();

    if (
      message.playerId !== myId &&
      !chatOpen
    ) {

      unreadMessages++;

      updateChatBadge();

      toast(
        message.playerName +
        " sent a voice note 🎤"
      );
    }
  }
);

// ==================================================
// RENDER CHAT
// ==================================================

function renderChat() {

  if (!chatMessagesBox) {
    return;
  }

  chatMessagesBox.innerHTML = "";

  if (
    chatMessages.length === 0
  ) {

    const empty =
      document.createElement(
        "div"
      );

    empty.className =
      "chat-empty";

    empty.innerHTML =
      "No messages yet.<br>Start the conversation.";

    chatMessagesBox.appendChild(
      empty
    );

    return;
  }

  chatMessages.forEach(
    message => {

      if (
        message.type === "voice"
      ) {

        renderVoiceNote(
          message
        );

        return;
      }

      const wrapper =
        document.createElement(
          "div"
        );

      wrapper.className =
        "chat-message";

      if (
        message.playerId === myId
      ) {

        wrapper.classList.add(
          "mine"
        );
      }

      const name =
        document.createElement(
          "div"
        );

      name.className =
        "chat-name";

      name.textContent =
        message.playerId === myId
          ? "You"
          : message.playerName;

      const bubble =
        document.createElement(
          "div"
        );

      bubble.className =
        "chat-bubble";

      bubble.textContent =
        message.message;

      const time =
        document.createElement(
          "div"
        );

      time.className =
        "chat-time";

      time.textContent =
        formatChatTime(
          message.time
        );

      wrapper.append(
        name,
        bubble,
        time
      );

      chatMessagesBox.appendChild(
        wrapper
      );
    }
  );

  scrollChatToBottom();
}

// ==================================================
// RENDER VOICE NOTE
// ==================================================

function renderVoiceNote(message) {

  const wrapper =
    document.createElement(
      "div"
    );

  wrapper.className =
    "chat-message voice-message";

  if (
    message.playerId === myId
  ) {

    wrapper.classList.add(
      "mine"
    );
  }

  const name =
    document.createElement(
      "div"
    );

  name.className =
    "chat-name";

  name.textContent =
    message.playerId === myId
      ? "You"
      : message.playerName;

  const bubble =
    document.createElement(
      "div"
    );

  bubble.className =
    "voice-note";

  const playButton =
    document.createElement(
      "button"
    );

  playButton.className =
    "voice-play";

  playButton.type =
    "button";

  playButton.textContent =
    "▶";

  const waveform =
    document.createElement(
      "div"
    );

  waveform.className =
    "voice-waveform";

  const bars =
    [
      8, 14, 22, 12, 18,
      28, 16, 24, 34, 20,
      13, 25, 18, 30, 15,
      22, 11, 26, 17, 9,
      21, 29, 14, 19, 12
    ];

  bars.forEach(height => {

    const bar =
      document.createElement(
        "span"
      );

    bar.style.height =
      height + "px";

    waveform.appendChild(bar);
  });

  const duration =
    document.createElement(
      "span"
    );

  duration.className =
    "voice-duration";

  duration.textContent =
    formatVoiceDuration(
      message.duration
    );

  const time =
    document.createElement(
      "div"
    );

  time.className =
    "chat-time";

  time.textContent =
    formatChatTime(
      message.time
    );

  bubble.append(
    playButton,
    waveform,
    duration
  );

  wrapper.append(
    name,
    bubble,
    time
  );

  chatMessagesBox.appendChild(
    wrapper
  );

  let audio = null;

  if (message.audio) {

    audio =
      new Audio(
        message.audio
      );

    audio.preload =
      "metadata";
  }

  playButton.onclick = () => {

    if (!audio) {

      toast(
        "Voice note is unavailable."
      );

      return;
    }

    if (audio.paused) {

      audio.play()
        .then(() => {

          playButton.textContent =
            "❚❚";

        })
        .catch(() => {

          toast(
            "Could not play voice note."
          );
        });

    } else {

      audio.pause();

      playButton.textContent =
        "▶";
    }
  };

  if (audio) {

    audio.onended = () => {

      playButton.textContent =
        "▶";
    };

    audio.ontimeupdate = () => {

      if (
        !audio.duration ||
        !Number.isFinite(audio.duration)
      ) {
        return;
      }

      const progress =
        audio.currentTime /
        audio.duration;

      waveform
        .style
        .setProperty(
          "--voice-progress",
          progress
        );
    };
  }
}

// ==================================================
// FORMAT VOICE DURATION
// ==================================================

function formatVoiceDuration(seconds) {

  const value =
    Math.max(
      0,
      Number(seconds) || 0
    );

  const minutes =
    Math.floor(
      value / 60
    );

  const secs =
    Math.floor(
      value % 60
    );

  return (
    String(minutes) +
    ":" +
    String(secs)
      .padStart(2, "0")
  );
}

// ==================================================
// FORMAT CHAT TIME
// ==================================================

function formatChatTime(timestamp) {

  if (!timestamp) {
    return "";
  }

  const date =
    new Date(timestamp);

  return date.toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  );
}

// ==================================================
// SCROLL CHAT
// ==================================================

function scrollChatToBottom() {

  if (!chatMessagesBox) {
    return;
  }

  chatMessagesBox.scrollTop =
    chatMessagesBox.scrollHeight;
}

// ==================================================
// CHAT BADGE
// ==================================================

function updateChatBadge() {

  if (!chatBadge) {
    return;
  }

  if (
    unreadMessages <= 0
  ) {

    chatBadge.classList.remove(
      "show"
    );

    chatBadge.textContent =
      "0";

    return;
  }

  chatBadge.classList.add(
    "show"
  );

  chatBadge.textContent =
    unreadMessages > 99
      ? "99+"
      : String(unreadMessages);
}

// ==================================================
// CLEAR CHAT
// ==================================================

function clearChat() {

  chatMessages = [];

  unreadMessages = 0;

  updateChatBadge();

  renderChat();
}

// ==================================================
// VOICE NOTE UI
// ==================================================

const voiceButton =
  $("voiceButton");

const voiceStatus =
  $("voiceStatus");

function updateVoiceNoteUI() {

  if (!voiceButton) {
    return;
  }

  if (voiceRecording) {

    voiceButton.textContent =
      "🔴 " +
      formatVoiceDuration(
        voiceRecordingSeconds
      );

    voiceButton.classList.add(
      "recording"
    );

    voiceButton.classList.remove(
      "off"
    );

    if (voiceStatus) {

      voiceStatus.textContent =
        voiceRecordingCancelled
          ? "Release to cancel"
          : "Release to send";
    }

  } else {

    voiceButton.textContent =
      "🎤";

    voiceButton.classList.remove(
      "recording"
    );

    voiceButton.classList.add(
      "off"
    );

    if (voiceStatus) {

      voiceStatus.textContent =
        "Hold to record";
    }
  }
}

// ==================================================
// START RECORDING
// ==================================================

async function startVoiceRecording(event) {

  if (
    event &&
    event.button !== undefined &&
    event.button !== 0
  ) {
    return;
  }

  if (!room) {

    toast(
      "Join a room first."
    );

    return;
  }

  if (voiceRecording) {
    return;
  }

  try {

    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {

      toast(
        "Your browser does not support voice recording."
      );

      return;
    }

    voiceStream =
      await navigator.mediaDevices.getUserMedia(
        {
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          },
          video: false
        }
      );

    const options =
      getVoiceRecorderOptions();

    mediaRecorder =
      options
        ? new MediaRecorder(
            voiceStream,
            options
          )
        : new MediaRecorder(
            voiceStream
          );

    voiceChunks = [];

    voiceRecording = true;

    voiceRecordingCancelled =
      false;

    voiceRecordingSeconds =
      0;

    mediaRecorder.ondataavailable =
      event => {

        if (
          event.data &&
          event.data.size > 0
        ) {

          voiceChunks.push(
            event.data
          );
        }
      };

    mediaRecorder.onstop =
      async () => {

        const wasCancelled =
          voiceRecordingCancelled;

        const duration =
          voiceRecordingSeconds;

        voiceRecording = false;

        clearInterval(
          voiceRecordingTimer
        );

        updateVoiceNoteUI();

        if (voiceStream) {

          voiceStream
            .getTracks()
            .forEach(
              track => {
                track.stop();
              }
            );

          voiceStream = null;
        }

        if (wasCancelled) {

          voiceChunks = [];

          return;
        }

        if (
          !voiceChunks.length
        ) {

          return;
        }

        const blob =
          new Blob(
            voiceChunks,
            {
              type:
                mediaRecorder.mimeType ||
                "audio/webm"
            }
          );

        voiceChunks = [];

        await sendVoiceNote(
          blob,
          duration
        );
      };

    mediaRecorder.start();

    updateVoiceNoteUI();

    voiceRecordingTimer =
      setInterval(() => {

        voiceRecordingSeconds++;

        updateVoiceNoteUI();

        if (
          voiceRecordingSeconds >=
          MAX_VOICE_SECONDS
        ) {

          stopVoiceRecording(
            false
          );
        }

      }, 1000);

  } catch (err) {

    console.error(
      "Voice recording error:",
      err
    );

    voiceRecording = false;

    clearInterval(
      voiceRecordingTimer
    );

    if (voiceStream) {

      voiceStream
        .getTracks()
        .forEach(
          track => {
            track.stop();
          }
        );

      voiceStream = null;
    }

    updateVoiceNoteUI();

    if (
      err &&
      err.name ===
      "NotAllowedError"
    ) {

      toast(
        "Microphone permission was denied."
      );

    } else {

      toast(
        "Could not access your microphone."
      );
    }
  }
}

// ==================================================
// RECORDER OPTIONS
// ==================================================

function getVoiceRecorderOptions() {

  if (
    typeof MediaRecorder ===
    "undefined"
  ) {

    return null;
  }

  const formats = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg;codecs=opus"
  ];

  for (
    const type of formats
  ) {

    if (
      MediaRecorder.isTypeSupported(
        type
      )
    ) {

      return {
        mimeType: type
      };
    }
  }

  return null;
}

// ==================================================
// STOP RECORDING
// ==================================================

function stopVoiceRecording(
  cancel = true
) {

  if (!mediaRecorder) {
    return;
  }

  if (
    mediaRecorder.state ===
    "inactive"
  ) {

    return;
  }

  voiceRecordingCancelled =
    cancel;

  clearInterval(
    voiceRecordingTimer
  );

  mediaRecorder.stop();
}

// ==================================================
// SEND VOICE NOTE
// ==================================================

async function sendVoiceNote(
  blob,
  duration
) {

  if (!room) {
    return;
  }

  try {

    const MAX_SIZE =
      5 * 1024 * 1024;

    if (blob.size > MAX_SIZE) {

      toast(
        "Voice note is too large."
      );

      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {

      const audio =
        reader.result;

      const message = {
        audio,
        duration:
          Math.min(
            MAX_VOICE_SECONDS,
            duration
          ),
        mimeType:
          blob.type
      };

      socket.emit(
        "chat:voice",
        message
      );
    };

    reader.onerror = () => {

      toast(
        "Could not send voice note."
      );
    };

    reader.readAsDataURL(
      blob
    );

  } catch (err) {

    console.error(
      "Voice note send error:",
      err
    );

    toast(
      "Could not send voice note."
    );
  }
}

// ==================================================
// VOICE BUTTON EVENTS
// ==================================================

if (voiceButton) {

  voiceButton.addEventListener(
    "mousedown",
    event => {

      startVoiceRecording(
        event
      );
    }
  );

  voiceButton.addEventListener(
    "mouseup",
    () => {

      stopVoiceRecording(
        false
      );
    }
  );

  voiceButton.addEventListener(
    "mouseleave",
    () => {

      if (voiceRecording) {

        voiceRecordingCancelled =
          true;

        stopVoiceRecording(
          true
        );
      }
    }
  );

  voiceButton.addEventListener(
    "touchstart",
    event => {

      event.preventDefault();

      startVoiceRecording();
    },
    {
      passive: false
    }
  );

  voiceButton.addEventListener(
    "touchend",
    event => {

      event.preventDefault();

      stopVoiceRecording(
        false
      );
    },
    {
      passive: false
    }
  );

  voiceButton.addEventListener(
    "touchcancel",
    () => {

      stopVoiceRecording(
        true
      );
    }
  );

  voiceButton.addEventListener(
    "contextmenu",
    event => {

      event.preventDefault();
    }
  );
}

// ==================================================
// INITIAL VOICE UI
// ==================================================

updateVoiceNoteUI();

// ==================================================
// AUTO CLEANUP
// ==================================================

window.addEventListener(
  "beforeunload",
  () => {

    if (
      mediaRecorder &&
      mediaRecorder.state !==
      "inactive"
    ) {

      try {
        mediaRecorder.stop();
      } catch (_) {}
    }

    if (voiceStream) {

      voiceStream
        .getTracks()
        .forEach(
          track => {
            track.stop();
          }
        );
    }
  }
);

// ==================================================
// END
// ==================================================
