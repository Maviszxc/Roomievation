async function updateFurniture() {
  // Get all form values
  const furnitureId = document.getElementById("updateFurnitureId").value.trim();
  const furnitureName = document
    .getElementById("updateFurnitureName")
    .value.trim();
  const furnitureDescription = document
    .getElementById("updateFurnitureDescription")
    .value.trim();
  const furnitureColorScheme = document
    .getElementById("updatefurnitureColorScheme")
    .value.trim(); // Ensure correct ID
  const furnitureSize = document
    .getElementById("updateFurnitureSize")
    .value.trim();
  const furnitureStock = document
    .getElementById("updateFurnitureStock")
    .value.trim();
  const furnitureAvailability = document.getElementById(
    "updateFurnitureAvailability"
  ).value;
  const furniturePrice = document
    .getElementById("updateFurniturePrice")
    .value.trim();

  // Basic validation
  if (!furnitureColorScheme) {
    alert("Color scheme is required. Please enter at least one color.");
    return;
  }

  // Create form data object
  const formData = {
    furnitureName,
    furnitureDescription,
    furnitureColorScheme,
    furnitureSize,
    furnitureStock,
    furnitureAvailability,
    furniturePrice,
  };

  // Log the data being sent for debugging
  console.log("Sending data:", formData);

  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/roomFurnitures/${furnitureId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Furniture updated successfully!");
      window.location.reload();
    } else {
      alert(data.message || "Failed to update furniture.");
    }
  } catch (error) {
    console.error("Error updating furniture:", error);
    alert("An error occurred while updating the furniture.");
  }
}
