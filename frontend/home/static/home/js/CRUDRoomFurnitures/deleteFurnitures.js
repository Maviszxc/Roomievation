function deleteFurniture() {
  const furnitureId = document.getElementById("deleteFurnitureId").value;

  fetch(`http://localhost:4000/api/v1/roomFurnitures/${furnitureId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message || "Furniture deleted successfully!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while deleting the furniture.");
    });
}
