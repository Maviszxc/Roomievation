// Modal control functions
function openLoginModal() {
  document.getElementById("loginModal").style.display = "block";
}

function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}

// Login form handler
document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const feedbackDiv = document.getElementById("loginFeedback");

    try {
      const response = await fetch("http://localhost:4000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user ID in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);

        feedbackDiv.innerHTML =
          '<p style="color: green;">Login successful! Redirecting...</p>';

        // Redirect to dashboard after successful login
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        feedbackDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
      }
    } catch (error) {
      console.error("Login error:", error);
      feedbackDiv.innerHTML =
        '<p style="color: red;">An error occurred during login</p>';
    }
  });
