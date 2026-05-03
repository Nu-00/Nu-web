// BGM処理
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

    document.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("http")) {
          bgm.pause();
          bgm.currentTime = 0;
        }
      });
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        bgm.pause();
      } else {
        bgm.play().catch(() => {});
      }
    });
  }

  // クイズシャッフル
  const container = document.getElementById("quiz-container");
  if (container) {
    const questions = Array.from(container.children);

    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    questions.forEach(q => container.appendChild(q));

    // 問題番号振り直し
    questions.forEach((q, index) => {
      const h2 = q.querySelector("h2");
      h2.textContent = "問題" + (index + 1);
    });
  }
});

// ログイン処理
function checkPassword() {
  const input = document.getElementById("password").value;
  const correctPassword = "883301";

  if (input === correctPassword) {
    sessionStorage.setItem("login", "true");
    window.location.href = "page4.html";
  } else {
    alert("パスワードが違います");
  }
}

// クイズ処理
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

  document.getElementById("score").textContent = "スコア: " + score;
  document.getElementById("total").textContent = "問題数: " + Object.keys(correctAnswers).length;
}