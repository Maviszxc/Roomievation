document
  .querySelector('form[action$="roomFurnitures"]')
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch(this.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        event.target.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding furniture.");
      });
  });
