const scriptUrl = "https://script.google.com/macros/s/https://script.google.com/macros/library/d/1AuOSpSVIwslcp8FTbm5_sLXE6L1BBcL-CnCq0Yx5PITg77xRd0NWN3mf/1/exec/exec";
let currentId = "";

async function fetchUser() {
  const id = document.getElementById("cardId").value.trim();
  if (!id) return alert("請輸入卡號");

  const res = await fetch(`${scriptUrl}?id=${id}&cost=0`);
  const data = await res.json();

  const resultDiv = document.getElementById("result");
  if (data.status === "success") {
    currentId = id;
    document.getElementById("name").textContent = data.name;
    document.getElementById("balance").textContent = data.newBalance;
    document.getElementById("userInfo").style.display = "block";
    resultDiv.textContent = "";
  } else {
    document.getElementById("userInfo").style.display = "none";
    resultDiv.textContent = `❌ ${data.message}`;
  }
}

async function deductMoney() {
  if (!currentId) return;

  const res = await fetch(`${scriptUrl}?id=${currentId}&cost=30`);
  const data = await res.json();

  const resultDiv = document.getElementById("result");
  if (data.status === "success") {
    document.getElementById("balance").textContent = data.newBalance;
    resultDiv.textContent = `✅ 扣款成功！剩餘 ${data.newBalance} 元`;
  } else {
    resultDiv.textContent = `❌ ${data.message}`;
  }
}
