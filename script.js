// ------------------------------------------------------
// PEAKORA — Unified Modal + UI Interactions
// ------------------------------------------------------


// --------------------
// CONTACT FORM MODAL
// --------------------
const contactForm = document.getElementById("contactForm");
const contactModal = document.getElementById("contactModal");
const contactClose = document.getElementById("contactClose");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactModal.classList.add("active");

    setTimeout(() => {
      contactModal.classList.remove("active");
    }, 3000);
  });
}

if (contactClose) {
  contactClose.addEventListener("click", () => {
    contactModal.classList.remove("active");
  });
}

if (contactModal) {
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove("active");
    }
  });
}


// --------------------
// ASSISTANT MODAL
// --------------------

document.addEventListener("DOMContentLoaded", () => {
  const assistantButton = document.getElementById("assistantButton");
  const assistantModalOverlay = document.getElementById("assistantModal");
  const assistantClose = document.getElementById("assistantClose");
  const assistantMessages = document.getElementById("assistantMessages");
  const assistantInput = document.getElementById("assistantInput");
  const assistantSend = document.getElementById("assistantSend");

  let firstUserMessage = null;
  let userName = null;

  // Human-like rhythm based on message length
  function rhythm(text) {
    const base = 900;
    const perChar = 45;
    return base + text.length * perChar;
  }

  function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.classList.add("assistant-message", "user");
    msg.textContent = text;
    assistantMessages.appendChild(msg);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  }

  function showTypingIndicator() {
    if (document.getElementById("typingIndicator")) return;

    const typing = document.createElement("div");
    typing.id = "typingIndicator";
    typing.classList.add("assistant-message");
    typing.textContent = "Peakora is typing…";
    assistantMessages.appendChild(typing);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  }

  function hideTypingIndicator() {
    const typing = document.getElementById("typingIndicator");
    if (typing) typing.remove();
  }

  function addAssistantMessageWithDelay(text) {
    const delay = rhythm(text);

    showTypingIndicator();

    setTimeout(() => {
      hideTypingIndicator();

      const msg = document.createElement("div");
      msg.classList.add("assistant-message");
      msg.textContent = text;
      assistantMessages.appendChild(msg);
      assistantMessages.scrollTop = assistantMessages.scrollHeight;
    }, delay);
  }

  function addRedirectButton(text) {
    const delay = rhythm(text);

    showTypingIndicator();

    setTimeout(() => {
      hideTypingIndicator();

      const wrapper = document.createElement("div");
      wrapper.classList.add("assistant-message");

      const btn = document.createElement("button");
      btn.textContent = "Connect me to Peakora Assistant";
      btn.style.padding = "12px 16px";
      btn.style.background = "#0057ff";
      btn.style.color = "white";
      btn.style.border = "none";
      btn.style.borderRadius = "8px";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "15px";
      btn.style.fontWeight = "600";

      btn.addEventListener("click", () => {
        window.open("https://peakora.com/assistant", "_blank");
      });

      wrapper.appendChild(btn);
      assistantMessages.appendChild(wrapper);
      assistantMessages.scrollTop = assistantMessages.scrollHeight;
    }, delay);
  }

  function openAssistant() {
    assistantModalOverlay.classList.add("open");

    if (!assistantMessages.dataset.initialized) {
      addAssistantMessageWithDelay("Hi, I’m Peakora.\nHow can I help you?");
      assistantMessages.dataset.initialized = "true";
    }
  }

  function closeAssistant() {
    assistantModalOverlay.classList.remove("open");
  }

  // Toggle modal on button click
  assistantButton.addEventListener("click", () => {
    if (assistantModalOverlay.classList.contains("open")) {
      closeAssistant();
    } else {
      openAssistant();
    }
  });

  // Close on X
  assistantClose.addEventListener("click", closeAssistant);

  // Close when clicking outside modal
  assistantModalOverlay.addEventListener("click", (e) => {
    if (e.target === assistantModalOverlay) closeAssistant();
  });

  function handleSend() {
    const text = assistantInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    assistantInput.value = "";

    // First user message
    if (!firstUserMessage) {
      firstUserMessage = text.toLowerCase();

      const isGreeting =
        firstUserMessage.includes("hi") ||
        firstUserMessage.includes("hello") ||
        firstUserMessage.includes("hey") ||
        firstUserMessage.includes("morning") ||
        firstUserMessage.includes("evening");

      if (isGreeting) {
        addAssistantMessageWithDelay(
          "It’s really nice to meet you.\nBefore we go further, may I know your name?"
        );
        return;
      }

      addAssistantMessageWithDelay(
        "I can definitely help you with that.\nBefore we go further, may I know your name?"
      );
      return;
    }

    // User provides name
    if (!userName) {
      userName = text;

      const isGreeting =
        firstUserMessage.includes("hi") ||
        firstUserMessage.includes("hello") ||
        firstUserMessage.includes("hey") ||
        firstUserMessage.includes("morning") ||
        firstUserMessage.includes("evening");

      if (isGreeting) {
        addAssistantMessageWithDelay(
          `Thank you for sharing that, ${userName}.\nWhat would you like support with today?`
        );
        return;
      }

      const msg = `Thank you for sharing that, ${userName}.\nI know exactly where you’ll get the support you need.\nLet me connect you with the Peakora Assistant`;

      addAssistantMessageWithDelay(msg);
      addRedirectButton(msg);
      return;
    }

    // Any message after name → offer redirect
    const msg = `Thank you for sharing that, ${userName}.\nI know exactly where you’ll get the support you need.\nLet me connect you with the Peakora Assistant`;

    addAssistantMessageWithDelay(msg);
    addRedirectButton(msg);
  }

  assistantSend.addEventListener("click", handleSend);

  assistantInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
});
