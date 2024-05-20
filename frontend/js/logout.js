window.onload = function () {
  document.getElementById("logoutBtn").onclick = logout;
};

function logout(e) {
  e.preventDefault();
  window.location.replace("../index.html");
  sessionStorage.clear();
}
