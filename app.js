const liveDate = document.getElementById("liveDate");
const liveTime = document.getElementById("liveTime");

function tick() {
  const d = new Date();
  liveDate.textContent = d.toISOString().slice(0, 10);

  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  liveTime.textContent = `${h}:${m}:${s} ${ampm}`;
}
setInterval(tick, 250);
tick();

const fields = ["bias", "model", "level", "invalidation"];
const els = Object.fromEntries(fields.map(id => [id, document.getElementById(id)]));

document.getElementById("btnReset").onclick = () => {
  fields.forEach(id => els[id].value = "");
};

document.getElementById("btnCopy").onclick = async () => {
  const text = `
Daily Trading Ticket
Date: ${liveDate.textContent}
Time: ${liveTime.textContent}

Bias: ${els.bias.value}
Model: ${els.model.value}
Level: ${els.level.value}
Invalidation: ${els.invalidation.value}
  `;
  await navigator.clipboard.writeText(text.trim());
  alert("Ticket copied");
};
