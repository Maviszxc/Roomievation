// Add scroll effect for images
document.addEventListener("scroll", function () {
  const scrollY = window.pageYOffset; 
  const items = document.querySelectorAll(".grid-item"); 

  items.forEach((item, index) => {
    
    const speed = 0.3;
    const offset = scrollY * (index % 2 === 0 ? speed : -speed); 
    item.style.transform = `translateY(${offset}px)`;
  });
});

// Function to show/hide password
const showHiddenPass = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass),
    iconEye = document.getElementById(loginEye);

  iconEye.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      iconEye.classList.add("ri-eye-line");
      iconEye.classList.remove("ri-eye-off-line");
    } else {
      input.type = "password";
      iconEye.classList.remove("ri-eye-line");
      iconEye.classList.add("ri-eye-off-line");
    }
  });
};

// Get modal elements
const signupModal = document.getElementById("signupModal");
const loginModal = document.getElementById("loginModal");

// Function to open the signup modal
function openSignupModal() {
  signupModal.style.display = "block";
}

// Function to close the signup modal
function closeSignupModal() {
  signupModal.style.display = "none"; 
}

// Function to open the login modal
function openLoginModal() {
  loginModal.style.display = "block"; 
}

// Function to close the login modal
function closeLoginModal() {
  loginModal.style.display = "none"; 
}

// Function to switch to the signup modal from the login modal
function switchSignupModal() {
  loginModal.style.display = "none";
  // signupModal.style.display = "block";
}

// Handle signup form submission
function handleSignup(event) {
  event.preventDefault(); 
  const contactNumber = document.getElementById("contact").value;

  // Validate contact number
  if (!/^\d{11}$/.test(contactNumber)) {
    alert("Please enter a valid 11-digit contact number.");
    return;
  }

  alert("Registration successful!"); 
  closeSignupModal(); 
  openLoginModal(); 
  document.getElementById("signupForm").reset(); 
}

// Handle login form submission
document.getElementById("loginForm").onsubmit = function (event) {
  event.preventDefault(); 
  // alert("Login successful!"); 
  // closeLoginModal(); 
};

// Close modals when clicking outside of them
window.onclick = function (event) {
  if (event.target == signupModal) {
    closeSignupModal(); 
  } else if (event.target == loginModal) {
    closeLoginModal();
  }
};

// Show the signup modal when the sign-up button is clicked
document.getElementById("signupBtn").onclick = function () {
  closeLoginModal();
  openSignupModal(); 
  
};

// Close the signup modal when the close button is clicked
document.getElementsByClassName("close")[0].onclick = function () {
  closeSignupModal(); 
};

// Close the login modal when the close button is clicked
document.getElementsByClassName("close")[1].onclick = function () {
  closeLoginModal(); 
};
