window.addEventListener("load", () => {
  const bgm = document.getElementById("bgm");
  if (!bgm) return;

  bgm.muted = true;
  bgm.volume = 0.3;

  bgm.play().catch(() => {
    console.log("自動再生ブロック");
  });

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
});

// 👇 ログイン処理
function checkPassword() {
  const input = document.getElementById("password").value;
  const correctPassword = "1234";

  if (input === correctPassword) {
    // ここでログインフラグ付ける
    sessionStorage.setItem("login", "true");

    // ここで遷移
    window.location.href = "page4.html";
  } else {
    alert("パスワードが違います");
  }
}