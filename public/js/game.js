const socket = io();

const $ = id => document.getElementById(id);

let myId = null;
let room = null;

let tickTimer = null;
let startTimer = null;

let currentRemaining = 60000;

let answering = false;

// ==================================================
// VOICE CHAT
// ==================================================

let localStream = null;
let voiceEnabled = false;

const peerConnections = new Map();
const peerNames = new Map();

const rtcConfig = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    },
    {
      urls: "stun:stun1.l.google.com:19302"
    }
  ]
};

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
  leaveVoice();

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
    room.bombHolder = state.holderId;
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

  leaveVoice();

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

    leaveVoice();

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
// ==================================================
// CHAT SYSTEM
// ==================================================
// ==================================================

// --------------------------------------------------
// CHAT ELEMENTS
// --------------------------------------------------

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

// --------------------------------------------------
// OPEN CHAT
// --------------------------------------------------

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

// --------------------------------------------------
// CLOSE CHAT
// --------------------------------------------------

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

// --------------------------------------------------
// CHAT BUTTON
// --------------------------------------------------

if (chatLauncher) {

  chatLauncher.onclick = () => {

    if (chatOpen) {
      closeChat();
    } else {
      openChat();
    }

  };
}

// --------------------------------------------------
// CLOSE BUTTON
// --------------------------------------------------

if (chatClose) {

  chatClose.onclick = () => {
    closeChat();
  };
}

// --------------------------------------------------
// CHAT FORM
// --------------------------------------------------

if (chatForm) {

  chatForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      sendChatMessage();
    }
  );
}

// --------------------------------------------------
// SEND MESSAGE
// --------------------------------------------------

function sendChatMessage() {

  if (!room) {
    return;
  }

  if (!chatInput) {
    return;
  }

  const message =
    chatInput.value
      .trim();

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

// --------------------------------------------------
// CHAT HISTORY
// --------------------------------------------------

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

// --------------------------------------------------
// NEW CHAT MESSAGE
// --------------------------------------------------

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
      message.playerId !==
      myId &&
      !chatOpen
    ) {

      unreadMessages++;

      updateChatBadge();
    }

    if (
      message.playerId !==
      myId &&
      !chatOpen
    ) {

      toast(
        message.playerName +
        ": " +
        message.message
      );
    }
  }
);

// --------------------------------------------------
// RENDER CHAT
// --------------------------------------------------

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

      const wrapper =
        document.createElement(
          "div"
        );

      wrapper.className =
        "chat-message";

      if (
        message.playerId ===
        myId
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

// --------------------------------------------------
// FORMAT CHAT TIME
// --------------------------------------------------

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

// --------------------------------------------------
// SCROLL CHAT
// --------------------------------------------------

function scrollChatToBottom() {

  if (!chatMessagesBox) {
    return;
  }

  chatMessagesBox.scrollTop =
    chatMessagesBox.scrollHeight;
}

// --------------------------------------------------
// CHAT BADGE
// --------------------------------------------------

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

// --------------------------------------------------
// CLEAR CHAT
// --------------------------------------------------

function clearChat() {

  chatMessages = [];

  unreadMessages = 0;

  updateChatBadge();

  renderChat();
}

// ==================================================
// ==================================================
// VOICE CHAT
// ==================================================
// ==================================================

// --------------------------------------------------
// VOICE ELEMENTS
// --------------------------------------------------

const voiceButton =
  $("voiceButton");

const voiceStatus =
  $("voiceStatus");

const voiceParticipants =
  $("voiceParticipants");

// --------------------------------------------------
// UPDATE VOICE UI
// --------------------------------------------------

function updateVoiceUI() {

  if (!voiceButton) {
    return;
  }

  if (voiceEnabled) {

    voiceButton.textContent =
      "🔇 LEAVE VOICE";

    voiceButton.classList.remove(
      "off"
    );

    if (voiceStatus) {

      voiceStatus.textContent =
        "Voice chat connected";
    }

  } else {

    voiceButton.textContent =
      "🎤 JOIN VOICE";

    voiceButton.classList.add(
      "off"
    );

    if (voiceStatus) {

      voiceStatus.textContent =
        "Voice chat is off";
    }
  }

  renderVoiceParticipants();
}

// --------------------------------------------------
// VOICE BUTTON
// --------------------------------------------------

if (voiceButton) {

  voiceButton.onclick = async () => {

    if (!room) {
      toast(
        "Join a room first."
      );

      return;
    }

    if (voiceEnabled) {

      leaveVoice();

    } else {

      await joinVoice();
    }

  };
}

// --------------------------------------------------
// JOIN VOICE
// --------------------------------------------------

async function joinVoice() {

  if (voiceEnabled) {
    return;
  }

  try {

    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {

      toast(
        "Your browser does not support microphone access."
      );

      return;
    }

    localStream =
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

    voiceEnabled = true;

    updateVoiceUI();

    socket.emit(
      "voice:join"
    );

    toast(
      "Voice chat enabled."
    );

  } catch (err) {

    console.error(
      "Microphone error:",
      err
    );

    voiceEnabled = false;

    localStream = null;

    updateVoiceUI();

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

// --------------------------------------------------
// LEAVE VOICE
// --------------------------------------------------

function leaveVoice() {

  if (voiceEnabled) {

    socket.emit(
      "voice:leave"
    );
  }

  voiceEnabled = false;

  peerConnections.forEach(
    connection => {

      try {
        connection.close();
      } catch (_) {}
    }
  );

  peerConnections.clear();

  peerNames.clear();

  if (localStream) {

    localStream
      .getTracks()
      .forEach(
        track => {
          track.stop();
        }
      );

    localStream = null;
  }

  updateVoiceUI();
}

// --------------------------------------------------
// PARTICIPANTS LIST
// --------------------------------------------------

socket.on(
  "voice:participants",
  async participants => {

    if (!voiceEnabled) {
      return;
    }

    if (!Array.isArray(participants)) {
      return;
    }

    for (
      const participant of participants
    ) {

      if (
        !participant ||
        !participant.peerId
      ) {
        continue;
      }

      peerNames.set(
        participant.peerId,
        participant.peerName ||
        "Player"
      );

      await createOffer(
        participant.peerId
      );
    }

    renderVoiceParticipants();
  }
);

// --------------------------------------------------
// NEW VOICE PEER
// --------------------------------------------------

socket.on(
  "voice:peer-joined",
  async data => {

    if (!data) {
      return;
    }

    if (!data.peerId) {
      return;
    }

    peerNames.set(
      data.peerId,
      data.peerName ||
      "Player"
    );

    renderVoiceParticipants();

    // The new player will receive an offer
    // from the player who is already in voice.
    if (voiceEnabled) {
      await createOffer(
        data.peerId
      );
    }
  }
);

// --------------------------------------------------
// CREATE PEER CONNECTION
// --------------------------------------------------

function createPeerConnection(
  peerId
) {

  if (
    peerConnections.has(
      peerId
    )
  ) {

    return peerConnections.get(
      peerId
    );
  }

  const pc =
    new RTCPeerConnection(
      rtcConfig
    );

  peerConnections.set(
    peerId,
    pc
  );

  // ----------------------------------------------
  // SEND MICROPHONE
  // ----------------------------------------------

  if (localStream) {

    localStream
      .getTracks()
      .forEach(
        track => {

          pc.addTrack(
            track,
            localStream
          );
        }
      );
  }

  // ----------------------------------------------
  // ICE
  // ----------------------------------------------

  pc.onicecandidate =
    event => {

      if (
        event.candidate
      ) {

        socket.emit(
          "voice:ice",
          {
            targetId:
              peerId,

            candidate:
              event.candidate
          }
        );
      }
    };

  // ----------------------------------------------
  // RECEIVE AUDIO
  // ----------------------------------------------

  pc.ontrack =
    event => {

      if (
        !event.streams ||
        !event.streams[0]
      ) {
        return;
      }

      attachRemoteAudio(
        peerId,
        event.streams[0]
      );
    };

  // ----------------------------------------------
  // CONNECTION STATE
  // ----------------------------------------------

  pc.onconnectionstatechange =
    () => {

      if (
        pc.connectionState ===
        "connected"
      ) {

        setVoicePersonTalking(
          peerId,
          false
        );

      }

      if (
        pc.connectionState ===
        "failed" ||
        pc.connectionState ===
        "closed" ||
        pc.connectionState ===
        "disconnected"
      ) {

        removePeer(
          peerId
        );
      }
    };

  return pc;
}

// --------------------------------------------------
// CREATE OFFER
// --------------------------------------------------

async function createOffer(
  peerId
) {

  if (!voiceEnabled) {
    return;
  }

  try {

    const pc =
      createPeerConnection(
        peerId
      );

    const offer =
      await pc.createOffer();

    await pc.setLocalDescription(
      offer
    );

    socket.emit(
      "voice:offer",
      {
        targetId:
          peerId,

        offer:
          pc.localDescription
      }
    );

  } catch (err) {

    console.error(
      "Voice offer error:",
      err
    );
  }
}

// --------------------------------------------------
// RECEIVE OFFER
// --------------------------------------------------

socket.on(
  "voice:offer",
  async data => {

    if (!voiceEnabled) {
      return;
    }

    if (
      !data ||
      !data.fromId ||
      !data.offer
    ) {
      return;
    }

    const peerId =
      data.fromId;

    try {

      const pc =
        createPeerConnection(
          peerId
        );

      await pc.setRemoteDescription(
        new RTCSessionDescription(
          data.offer
        )
      );

      const answer =
        await pc.createAnswer();

      await pc.setLocalDescription(
        answer
      );

      socket.emit(
        "voice:answer",
        {
          targetId:
            peerId,

          answer:
            pc.localDescription
        }
      );

    } catch (err) {

      console.error(
        "Voice offer handling error:",
        err
      );
    }
  }
);

// --------------------------------------------------
// RECEIVE ANSWER
// --------------------------------------------------

socket.on(
  "voice:answer",
  async data => {

    if (
      !data ||
      !data.fromId ||
      !data.answer
    ) {
      return;
    }

    const pc =
      peerConnections.get(
        data.fromId
      );

    if (!pc) {
      return;
    }

    try {

      await pc.setRemoteDescription(
        new RTCSessionDescription(
          data.answer
        )
      );

    } catch (err) {

      console.error(
        "Voice answer error:",
        err
      );
    }
  }
);

// --------------------------------------------------
// RECEIVE ICE
// --------------------------------------------------

socket.on(
  "voice:ice",
  async data => {

    if (
      !data ||
      !data.fromId ||
      !data.candidate
    ) {
      return;
    }

    const pc =
      peerConnections.get(
        data.fromId
      );

    if (!pc) {
      return;
    }

    try {

      await pc.addIceCandidate(
        new RTCIceCandidate(
          data.candidate
        )
      );

    } catch (err) {

      console.error(
        "ICE candidate error:",
        err
      );
    }
  }
);

// --------------------------------------------------
// PEER LEFT
// --------------------------------------------------

socket.on(
  "voice:peer-left",
  data => {

    if (
      !data ||
      !data.peerId
    ) {
      return;
    }

    removePeer(
      data.peerId
    );
  }
);

// --------------------------------------------------
// REMOVE PEER
// --------------------------------------------------

function removePeer(
  peerId
) {

  const pc =
    peerConnections.get(
      peerId
    );

  if (pc) {

    try {
      pc.close();
    } catch (_) {}

    peerConnections.delete(
      peerId
    );
  }

  peerNames.delete(
    peerId
  );

  const audio =
    document.getElementById(
      "voice-audio-" +
      peerId
    );

  if (audio) {
    audio.remove();
  }

  renderVoiceParticipants();
}

// --------------------------------------------------
// REMOTE AUDIO
// --------------------------------------------------

function attachRemoteAudio(
  peerId,
  stream
) {

  let audio =
    document.getElementById(
      "voice-audio-" +
      peerId
    );

  if (!audio) {

    audio =
      document.createElement(
        "audio"
      );

    audio.id =
      "voice-audio-" +
      peerId;

    audio.autoplay =
      true;

    audio.playsInline =
      true;

    audio.style.display =
      "none";

    document.body.appendChild(
      audio
    );
  }

  audio.srcObject =
    stream;

  audio.play()
    .catch(
      () => {}
    );
}

// --------------------------------------------------
// VOICE PARTICIPANTS UI
// --------------------------------------------------

function renderVoiceParticipants() {

  if (!voiceParticipants) {
    return;
  }

  voiceParticipants.innerHTML = "";

  if (!voiceEnabled) {
    return;
  }

  const me =
    document.createElement(
      "span"
    );

  me.className =
    "voice-person";

  me.textContent =
    "🎤 You";

  voiceParticipants.appendChild(
    me
  );

  peerNames.forEach(
    (name, peerId) => {

      if (
        !peerConnections.has(
          peerId
        )
      ) {
        return;
      }

      const person =
        document.createElement(
          "span"
        );

      person.className =
        "voice-person";

      person.id =
        "voice-person-" +
        peerId;

      person.textContent =
        "🎙️ " +
        name;

      voiceParticipants.appendChild(
        person
      );
    }
  );
}

// --------------------------------------------------
// VOICE TALKING INDICATOR
// --------------------------------------------------

function setVoicePersonTalking(
  peerId,
  talking
) {

  const element =
    document.getElementById(
      "voice-person-" +
      peerId
    );

  if (!element) {
    return;
  }

  element.classList.toggle(
    "talking",
    Boolean(talking)
  );
}

// ==================================================
// AUTO CLEANUP WHEN PAGE CLOSES
// ==================================================

window.addEventListener(
  "beforeunload",
  () => {

    if (voiceEnabled) {

      socket.emit(
        "voice:leave"
      );
    }
  }
);

// ==================================================
// END
// ==================================================
