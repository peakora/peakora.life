// --------------------------------------------------
// Peakora Agent Modal Logic
// --------------------------------------------------

const agentBtn = document.getElementById("agentBtn");
const agentModal = document.getElementById("agentModal");
const agentClose = document.getElementById("agentClose");
const agentForm = document.getElementById("agentForm");
const agentThanks = document.getElementById("agentThanks");

// Some pages have an extra hero button
const openAgentHero = document.getElementById("openAgentHero");

// Open modal
function openAgent() {
  if (agentModal) {
    agentModal.style.display = "flex";
    agentModal.setAttribute("aria-hidden", "false");
  }
}

if (agentBtn) agentBtn.addEventListener("click", openAgent);
if (openAgentHero) openAgentHero.addEventListener("click", openAgent);

// Close modal
function closeAgent() {
  if (agentModal) {
    agentModal.style.display = "none";
    agentModal.setAttribute("aria-hidden", "true");
  }
}

if (agentClose) agentClose.addEventListener("click", closeAgent);

// Close when clicking outside the panel
if (agentModal) {
  agentModal.addEventListener("click", function (e) {
    if (e.target === agentModal) {
      closeAgent();
    }
  });
}

// --------------------------------------------------
// Form Submission (Simulated)
// --------------------------------------------------

if (agentForm) {
  agentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Hide form, show thanks
    agentForm.style.display = "none";
    agentThanks.hidden = false;

    // Auto-close after 2.5 seconds
    setTimeout(function () {
      closeAgent();
      agentForm.reset();
      agentForm.style.display = "block";
      agentThanks.hidden = true;
    }, 2500);
  });
}
