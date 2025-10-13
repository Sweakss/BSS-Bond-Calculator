const bondTable = [
  0, 10, 40, 200, 750, 4000, 15000, 60000, 270000, 450000, 1200000, 2000000,
  4000000, 7000000, 15000000, 120000000, 450000000, 1900000000, 7500000000,
  15000000000, 475000000000, 4500000000000, 95000000000000,
  5000000000000000, 95000000000000000
];

function formatNumber(num) {
  if (num >= 1e15) return (num / 1e15).toFixed(2) + " quadrillion";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + " trillion";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + " billion";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + " million";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + " thousand";
  return num.toString();
}

function calculate() {
  const startLevel = parseInt(document.getElementById("startLevel").value);
  const targetLevel = parseInt(document.getElementById("targetLevel").value);
  const numBees = parseInt(document.getElementById("numBees").value);
  const bonusPercent = parseInt(document.getElementById("bonus").value);
  const resultEl = document.getElementById("result");

  if (isNaN(startLevel) || isNaN(targetLevel) || isNaN(numBees) || isNaN(bonusPercent) || startLevel >= targetLevel) {
    resultEl.innerText = "⚠️ Please enter valid numbers. Target level must be higher than start level.";
    return;
  }

  let totalBond = 0;
  for (let i = startLevel; i < targetLevel; i++) {
    totalBond += bondTable[i] || 0;
  }

  const effectiveBondPerTreat = 10 * (bonusPercent / 100);
  const treatsNeeded = Math.ceil(totalBond / effectiveBondPerTreat);
  const honeyPerBee = treatsNeeded * 10000;
  const totalHoney = honeyPerBee * numBees;

  resultEl.innerText =
    `You need approximately ${formatNumber(totalHoney)} honey to level ${numBees} bee(s) from level ${startLevel} → ${targetLevel} with ${bonusPercent}% bonus.`;
}

// Auto-update when inputs change
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", calculate);
});

// Initial calculation
window.addEventListener("DOMContentLoaded", calculate);
