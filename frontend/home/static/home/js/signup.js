// Modal control functions
function openSignupModal() {
  document.getElementById("signupModal").style.display = "block";
}

function closeSignupModal() {
  document.getElementById("signupModal").style.display = "none";
}

// Signup form handler
document
  .getElementById("signupForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      address: document.getElementById("address").value,
      contact: document.getElementById("contact").value,
    };

    const feedbackDiv = document.getElementById("feedback");

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        feedbackDiv.innerHTML =
          '<p style="color: green;">Registration successful! Please login.</p>';

        // Clear the form
        document.getElementById("signupForm").reset();

        // Automatically open login modal after successful registration
        setTimeout(() => {
          closeSignupModal();
          openLoginModal();
        }, 1500);
      } else {
        feedbackDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
      }
    } catch (error) {
      console.error("Signup error:", error);
      feedbackDiv.innerHTML =
        '<p style="color: red;">An error occurred during registration</p>';
    }
  });
