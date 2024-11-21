// Check if user is authenticated
function isAuthenticated() {
  return localStorage.getItem("token") !== null;
}

// Update UI based on authentication status
function updateAuthUI() {
  const token = localStorage.getItem("token");
  const loginBtn = document.querySelector(".nav__btn");
  const cartIcon = document.querySelector(".fa-shopping-cart");
  const profileIcon = document.querySelector(".fa-user");

  if (token) {
    // User is logged in
    loginBtn.textContent = "Logout";
    loginBtn.onclick = handleLogout;

    // Show cart and profile icons
    if (cartIcon) cartIcon.style.display = "inline-block";
    if (profileIcon) profileIcon.style.display = "inline-block";
  } else {
    // User is logged out
    loginBtn.textContent = "Login";
    loginBtn.onclick = openLoginModal;

    // Hide cart and profile icons
    if (cartIcon) cartIcon.style.display = "none";
    if (profileIcon) profileIcon.style.display = "none";
  }
}

// Handle logout
function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.href = "/";
}

// Check authentication on page load
document.addEventListener("DOMContentLoaded", updateAuthUI);
