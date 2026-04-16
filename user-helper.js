window.currentUser = localStorage.getItem("currentUser") || null;

/* SAFE ADMIN CHECK */
window.isAdminUser = function () {
  return window.currentUser === "Game_Master";
};

/* SAFE LOGOUT */
window.logoutUser = function () {
  localStorage.removeItem("currentUser");
  location.href = "login.html";
};

function safeInit() {
  try {
    const userBox = document.getElementById("userBox");
    if (userBox && window.currentUser) {
      userBox.innerHTML = `
        <span>${window.currentUser}</span>
        <button onclick="logoutUser()" style="margin-left:10px;">
          Logout
        </button>
      `;
    }

    const tokenEl = document.getElementById("tokens");
    if (tokenEl && window.currentUser) {
      tokenEl.innerText =
        "🪙 " +
        (localStorage.getItem(window.currentUser + "_tokens") || 0);
    }

    document.querySelectorAll(".admin, #adminPanel").forEach(el => {
      if (el && window.isAdminUser()) {
        el.style.display = "block";
      }
    });
  } catch (err) {
    console.error("user-helper crashed:", err);
  }
}

document.addEventListener("DOMContentLoaded", safeInit);