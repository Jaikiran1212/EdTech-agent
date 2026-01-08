const chat = document.getElementById("chat");
const input = document.getElementById("input");

const state = {
  course: null,
  name: null,
  email: null,
  completed: false
};

function bot(msg) {
  chat.innerHTML += `<div class="bot"><b>Agent:</b> ${msg}</div>`;
}

function user(msg) {
  chat.innerHTML += `<div class="user"><b>You:</b> ${msg}</div>`;
}

bot("Hello! 👋 I can help you enroll in a course. What are you looking for?");

function send() {
  const text = input.value.trim();
  if (!text) return;
  user(text);
  input.value = "";
  process(text);
}

function process(text) {
  text = text.toLowerCase();

  // Handle correction / interruption
  if (text.includes("change") || text.includes("update")) {
    if (text.includes("course")) {
      state.course = null;
      bot("Sure 👍 Which course would you like instead?");
      return;
    }
  }

  if (!state.course) {
    state.course = text;
    bot(`Great choice! 😊 May I have your name?`);
    return;
  }

  if (!state.name) {
    state.name = text;
    bot("Thanks! Could you share your email address?");
    return;
  }

  if (!state.email) {
    if (!text.includes("@")) {
      bot("That doesn’t look like a valid email. Could you re‑enter it?");
      return;
    }
    state.email = text;
    enroll();
    return;
  }
}

function enroll() {
  bot("Processing your enrollment…");

  // External API / Tool Invocation
  fetch("https://webhook.site/YOUR_UNIQUE_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state)
  });

  bot(`🎉 Enrollment successful!  
  Course: ${state.course}  
  Confirmation will be sent to ${state.email}`);
}
