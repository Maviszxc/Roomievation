async function updateRoomModel() {
  const id = document.getElementById("updateRoomId").value.trim();
  const roomName = document.getElementById("updateRoomName").value.trim();
  const roomDescription = document
    .getElementById("updateRoomDescription")
    .value.trim();
  const roomType = document.getElementById("updateRoomType").value.trim();
  const roomTheme = document.getElementById("updateRoomTheme").value.trim();
  const colorScheme = document.getElementById("updateColorScheme").value.trim();

  // Validate that all fields have values
  if (
    !id ||
    !roomName ||
    !roomDescription ||
    !roomType ||
    !roomTheme ||
    !colorScheme
  ) {
    alert("All fields are required");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/roomModels/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName,
          roomDescription,
          roomType,
          roomTheme,
          colorScheme,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert("Room model updated successfully!");
      window.location.reload();
    } else {
      alert(data.message || "Failed to update room model.");
    }
  } catch (error) {
    console.error("Error updating room model:", error);
    alert("An error occurred while updating the room model.");
  }
}
