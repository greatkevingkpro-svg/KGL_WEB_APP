document.addEventListener("DOMContentLoaded", () => {
  const session = localStorage.getItem("kglSession");

  if (!session) {
    window.location.href = "login.html"; // force login
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("kglSession");

  window.location.href = "login.html"; // back to login
});
