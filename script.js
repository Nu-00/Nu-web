
// =====================
// SHA-256 ハッシュ関数
// =====================
async function hash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// =====================
// パスワードチェック
// =====================
async function checkPassword() {
  const input = document.getElementById("password").value;
  const inputHash = await hash(input);

  const correctHash =
    "f333da4cfe442f0d6611b00c9ed34d01f2ce21142ac8f1d5cffefef8e5e0b7ae";
  const correctHash2 =
    "888df25ae35772424a560c7152a1de794440e0ea5cfee62828333a456a506e05";

  if (inputHash === correctHash) {
    sessionStorage.setItem("page", "4");
    location.href = "page4.html";
    return;
  }

  if (inputHash === correctHash2) {
    sessionStorage.setItem("page", "5");
    location.href = "page5.html";
    return;
  }

  alert("パスワードが違います");
}

// =====================
// BGM処理
// =====================
window.addEventListener("load", () => {
  const bgm = document.getElementById("bgm");
  if (!bgm) return;

  bgm.muted = true;
  bgm.volume = 0.3;

  bgm.play().catch(() => {});

  document.addEventListener(
    "click",
    () => {
      bgm.muted = false;
      bgm.play();
    },
    { once: true }
  );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      bgm.pause();
    } else {
      bgm.play().catch(() => {});
    }
  });
});

// =====================
// クイズ処理
// =====================
let score = 0;
const answered = {};

// ★解説（完全そのまま維持）
const explanations = {
  1: "機密性・完全性・可用性（CIA）は情報セキュリティの基本3要素。",
  2: "Cクラスは192.168.0.0/16\nAクラスは10.0.0.0/8\nBクラスは172.16.0.0/12。",
  3: "n(n-1)/2は共通鍵、2nは公開鍵。",
  4: "TCPやUDPはトランスポート層のプロトコル、IPなどはネットワーク層のプロトコル。",
  5: "フラッシュメモリは電気的に消去可能なROM。\nキャッシュメモリはCPUと記憶装置の間を高速化するメモリ\nマスクROMは製造時にデータを書き込む不揮発性メモリ",
  6: "FIFOは先入れ先出し方式。",
  7: "10000100は\n128+4=132",
  8: "ANDは両方が1のとき1\nORはどちらかが1のとき1\nXORはどちらか一方が1のとき1を出力する",
  9: "正しい順番は\n標本化→量子化→符号化",
  10: "教師あり学習は正解ラベルを与えて学習する\n教師なし学習は正解ラベルを与えずに学習する\n強化学習は与えられる報酬が最大になるように学習する"
};

const correctAnswers = {
  1: "A",
  2: "C",
  3: "C",
  4: "B",
  5: "B",
  6: "C",
  7: "A",
  8: "A",
  9: "C",
  10: "C"
};

function checkAnswer(question, answer) {
  const exp = document.getElementById("explanation" + question);
  const result = document.getElementById("result" + question);

  if (answered[question]) {
    result.textContent = "すでに回答済み";
    return;
  }

  const isCorrect = answer === correctAnswers[question];

  if (isCorrect) {
    score++;
    result.textContent = "正解！";
    result.style.color = "green";
  } else {
    result.textContent = "不正解...";
    result.style.color = "red";
  }

  if (exp) {
    exp.innerHTML = explanations[question].replace(/\n/g, "<br>");
    exp.style.display = "block";
  }

  answered[question] = true;

  const scoreEl = document.getElementById("score");
  if (scoreEl) {
    scoreEl.textContent = `スコア: ${score}`;
  }
}