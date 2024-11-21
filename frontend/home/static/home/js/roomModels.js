async function fetchRoomModels() {
  try {
    const response = await fetch("http://localhost:4000/api/v1/roomModels{id}");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const roomModels = await response.json();
    console.log("Room Models:", roomModels); // Log the models to check their structure
    displayRoomModels(roomModels);
  } catch (error) {
    console.error("Error fetching room models:", error);
    document.getElementById("room-models-container").innerHTML =
      "<p>Error loading room models.</p>";
  }
}
