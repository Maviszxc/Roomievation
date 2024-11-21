document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(event.target);

  try {
    const response = await fetch(event.target.action, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      // Optionally reset the form or redirect
      event.target.reset();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding the room model.");
  }
});
