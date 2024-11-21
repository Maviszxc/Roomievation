async function deleteRoomModel() {
  const id = document.getElementById("deleteRoomId").value;

  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/roomModels/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert("Room model deleted successfully!");
      window.location.reload();
    } else {
      alert(data.message || "Failed to delete room model.");
    }
  } catch (error) {
    console.error("Error deleting room model:", error);
    alert("An error occurred while deleting the room model.");
  }
}
