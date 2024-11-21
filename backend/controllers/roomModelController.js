const multer = require("multer");
const path = require("path");
const RoomModels = require("../models/roomModelSchema");

// Define the absolute path to the pics directory
const UPLOAD_DIR = path.resolve(
  __dirname,
  "..",
  "..",
  "frontend",
  "home",
  "static",
  "home",
  "pics"
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Fetch all room models
const fetchRoomModels = async (req, res) => {
  try {
    console.log("Fetching room models...");
    const roomModels = await RoomModels.find();
    console.log("Room models found:", roomModels);

    if (!roomModels.length) {
      return res.status(404).json({ message: "No room models found." });
    }

    res.status(200).json(roomModels);
  } catch (error) {
    console.error("Error fetching room models:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new room model
const addRoomModel = (req, res) => {
  upload.single("roomImage")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ message: "Error uploading image" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }

    try {
      const { roomName, roomDescription, roomType, roomTheme, colorScheme } = req.body;

      const newRoomModel = new RoomModels({
        name: roomName,
        description: roomDescription,
        type: roomType,
        theme: roomTheme.split(","),
        colorscheme: colorScheme.split(","),
        image: req.file.filename,
      });

      await newRoomModel.save();
      res.status(201).json({ message: "Room model added successfully!" });
    } catch (error) {
      console.error("Error adding room model:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

// Fetch room model by ID
const fetchRoomModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const roomModel = await RoomModels.findById(id);

    if (!roomModel) {
      return res.status(404).json({ message: "Room model not found." });
    }

    res.status(200).json(roomModel);
  } catch (error) {
    console.error("Error fetching room model by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a room model
const updateRoomModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomName, roomDescription, roomType, roomTheme, colorScheme } =
      req.body;

    // Validate that required fields are present and are strings
    if (
      !roomName ||
      !roomDescription ||
      !roomType ||
      !roomTheme ||
      !colorScheme
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedRoomModel = await RoomModels.findByIdAndUpdate(
      id,
      {
        name: String(roomName),
        description: String(roomDescription),
        type: String(roomType),
        theme: Array.isArray(roomTheme) ? roomTheme : roomTheme.split(","),
        colorscheme: Array.isArray(colorScheme)
          ? colorScheme
          : colorScheme.split(","),
      },
      { new: true, runValidators: true }
    );

    if (!updatedRoomModel) {
      return res.status(404).json({ message: "Room model not found." });
    }

    res.status(200).json({
      message: "Room model updated successfully!",
      roomModel: updatedRoomModel,
    });
  } catch (error) {
    console.error("Error updating room model:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a room model
const deleteRoomModel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRoomModel = await RoomModels.findByIdAndDelete(id);

    if (!deletedRoomModel) {
      return res.status(404).json({ message: "Room model not found." });
    }

    res.status(200).json({ message: "Room model deleted successfully!" });
  } catch (error) {
    console.error("Error deleting room model:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  fetchRoomModels,
  addRoomModel,
  updateRoomModel,
  deleteRoomModel,
  fetchRoomModelById,
};