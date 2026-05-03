
async function hash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function checkPassword() {
  const input = document.getElementById("password").value;
  const inputHash = await hash(input);

  const correctHash = "f333da4cfe442f0d6611b00c9ed34d01f2ce21142ac8f1d5cffefef8e5e0b7ae";

  if (inputHash === correctHash) {
    sessionStorage.setItem("login", "true");
    window.location.href = "page4.html";
  } else {
    alert("パスワードが違います");
  }
}


window.addEventListener("load", () => {
  const bgm = document.getElementById("bgm");

  if (bgm) {
    bgm.muted = true;
    bgm.volume = 0.3;

    bgm.play().catch(() => {});

    document.addEventListener("click", () => {
      bgm.muted = false;
      bgm.play();
    }, { once: true });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        bgm.pause();
      } else {
        bgm.play().catch(() => {});
      }
    });
  }

  const container = document.getElementById("quiz-container");

  if (container) {
    const questions = Array.from(container.children);

    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    questions.forEach(q => container.appendChild(q));

    questions.forEach((q, index) => {
      const h2 = q.querySelector("h2");
      if (h2) h2.textContent = "問題" + (index + 1);
    });
  }
});


let score = 0;
const answered = {};

function checkAnswer(question, answer) {

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

  const result = document.getElementById("result" + question);

  if (!answered[question]) {

    if (answer === correctAnswers[question]) {
      score++;
      result.textContent = "正解！";
      result.style.color = "green";
    } else {
      result.textContent = "不正解...";
      result.style.color = "red";
    }

    answered[question] = true;

  } else {
    result.textContent = "すでに回答済み";
  }

  const total = Object.keys(correctAnswers).length;

  document.getElementById("score").textContent =
    "スコア: " + score;
}
