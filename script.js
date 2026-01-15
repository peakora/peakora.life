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

  function addAssistantMessage(text) {
    const msg = document.createElement("div");
    msg.classList.add("assistant-message");
    msg.textContent = text;
    assistantMessages.appendChild(msg);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  }

  function addAssistantMessageWithDelay(text, delay) {
    setTimeout(() => {
      addAssistantMessage(text);
    }, delay);
  }

  function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.classList.add("assistant-message", "user");
    msg.textContent = text;
    assistantMessages.appendChild(msg);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  }

  function addRedirectButton(delay) {
    setTimeout(() => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("assistant-message");

      const btn = document.createElement("button");
      btn.textContent = "Connect me to Peakora Assistant";
      btn.style.padding = "10px 14px";
      btn.style.background = "#0057ff";
      btn.style.color = "white";
      btn.style.border = "none";
      btn.style.borderRadius = "8px";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "14px";
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
      addAssistantMessageWithDelay("Hi, I’m Peakora.\nHow can I help you?", 400);
      assistantMessages.dataset.initialized = "true";
    }
  }

  function closeAssistant() {
    assistantModalOverlay.classList.remove("open");
  }

  function handleSend() {
    const text = assistantInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    assistantInput.value = "";

    // FIRST USER MESSAGE
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
          "It’s really nice to meet you.\nBefore we go further, may I know your name?",
          600
        );
        return;
      }

      addAssistantMessageWithDelay(
        "I can definitely help you with that.\nBefore we go further, may I know your name?",
        600
      );
      return;
    }

    // USER PROVIDES NAME
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
          `Thank you for sharing that, ${userName}.\nWhat would you like support with today?`,
          600
        );
        return;
      }

      addAssistantMessageWithDelay(
        `Thank you for sharing that, ${userName}.\nI know exactly where you’ll get the support you need.\nLet me connect you with the Peakora Assistant`,
        600
      );

      addRedirectButton(1600);
      return;
    }

    // ANY MESSAGE AFTER NAME → OFFER REDIRECT
    if (userName) {
      addAssistantMessageWithDelay(
        `Thank you for sharing that, ${userName}.\nI know exactly where you’ll get the support you need.\nLet me connect you with the Peakora Assistant`,
        600
      );

      addRedirectButton(1600);
    }
  }

  assistantButton.addEventListener("click", openAssistant);
  assistantClose.addEventListener("click", closeAssistant);
  assistantSend.addEventListener("click", handleSend);

  assistantInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
});
