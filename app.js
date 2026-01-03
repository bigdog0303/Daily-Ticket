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

const ids = [
  "bias","model","level","invalidation","notes",
  "chkBiasWritten","chkTriggerTrue","chkExecuted","chkSaveLocal"
];

const els = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));
const KEY = "trade-ticket";

function getState() {
  return Object.fromEntries(
    ids.map(id => [
      id,
      els[id].type === "checkbox" ? els[id].checked : els[id].value
    ])
  );
}

function save() {
  if (els.chkSaveLocal.checked) {
    localStorage.setItem(KEY, JSON.stringify(getState()));
  }
}

function load() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return;
  const data = JSON.parse(raw);
  ids.forEach(id => {
    if (els[id].type === "checkbox") els[id].checked = data[id];
    else els[id].value = data[id];
  });
}

ids.forEach(id => els[id].addEventListener("input", save));
load();

document.getElementById("btnReset").onclick = () => {
  ids.forEach(id => {
    if (els[id].type === "checkbox") els[id].checked = false;
    else els[id].value = "";
  });
  localStorage.removeItem(KEY);
};

document.getElementById("btnCopy").onclick = async () => {
  const s = getState();
  const text = `
Daily Trading Ticket
Date: ${liveDate.textContent}
Time: ${liveTime.textContent}

Bias: ${s.bias}
Model: ${s.model}
Level: ${s.level}
Invalidation: ${s.invalidation}

Bias Written: ${s.chkBiasWritten}
Trigger True: ${s.chkTriggerTrue}
Executed: ${s.chkExecuted}

Notes:
${s.notes}
  `;
  await navigator.clipboard.writeText(text.trim());
  alert("Ticket copied");
};
