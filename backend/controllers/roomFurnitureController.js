const multer = require("multer");
const path = require("path");
const RoomFurnitures = require("../models/roomFurnitureSchema");

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
const fetchRoomFurnitures = async (req, res) => {
  try {
    const roomFurnitures = await RoomFurnitures.find();
    if (!roomFurnitures.length) {
      return res.status(404).json({ message: "No furnitures found." });
    }
    res.status(200).json(roomFurnitures);
  } catch (error) {
    console.error("Error fetching room furnitures:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new room model
const addRoomFurniture = (req, res) => {
  upload.single("roomImage")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ message: "Error uploading image" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }

    try {
      const {
        roomID,
        furnitureName,
        furnitureDescription,
        colorScheme,
        furnitureSize, // Keep this as a string
        furnitureStock,
        furnitureAvailability,
        furniturePrice,
      } = req.body;

      const newRoomFurniture = new RoomFurnitures({
        roomID: roomID,
        name: furnitureName,
        description: furnitureDescription,
        colorscheme: colorScheme.split(","),
        size: furnitureSize, // Store as a string
        stock: furnitureStock,
        availability: furnitureAvailability,
        price: furniturePrice,
        image: req.file.filename,
      });

      await newRoomFurniture.save();
      res.status(201).json({ message: "Furniture added successfully!" });
    } catch (error) {
      console.error("Error adding furniture:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

// Fetch room model by ID
const fetchRoomFurnitureById = async (req, res) => {
  try {
    const { id } = req.params;
    const roomFurniture = await RoomFurnitures.findById(id);
    if (!roomFurniture) {
      return res.status(404).json({ message: "Room furniture not found." });
    }
    res.status(200).json(roomFurniture);
  } catch (error) {
    console.error("Error fetching room furniture by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a room model
const updateRoomFurniture = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      furnitureName,
      furnitureDescription,
      furnitureColorScheme,
      furnitureSize,
      furnitureStock,
      furnitureAvailability,
      furniturePrice,
    } = req.body;

    console.log("Received data:", req.body);

    // Check if required fields are present
    if (
      !furnitureName ||
      !furnitureDescription ||
      !furnitureColorScheme ||
      !furnitureSize ||
      furnitureStock === undefined ||
      furniturePrice === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
        receivedData: req.body,
      });
    }

    // Prepare the update data
    const updatedData = {
      name: furnitureName,
      description: furnitureDescription,
      furnitureColorScheme: furnitureColorScheme,
      size: furnitureSize,
      stock: parseInt(furnitureStock),
      availability: furnitureAvailability === "true",
      price: parseFloat(furniturePrice),
    };

    console.log("Processed data:", updatedData);

    const updatedRoomFurniture = await RoomFurnitures.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedRoomFurniture) {
      return res.status(404).json({ message: "Room furniture not found" });
    }

    res.status(200).json({
      message: "Room furniture updated successfully!",
      updatedRoomFurniture,
    });
  } catch (error) {
    console.error("Error updating room furniture:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a room model
const deleteRoomFurniture = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoomFurniture = await RoomFurnitures.findByIdAndDelete(id);
    if (!deletedRoomFurniture) {
      return res.status(404).json({ message: "Room furniture not found." });
    }
    res.status(200).json({ message: "Room furniture deleted successfully!" });
  } catch (error) {
    console.error("Error deleting room furniture:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  fetchRoomFurnitures,
  addRoomFurniture,
  updateRoomFurniture,
  deleteRoomFurniture,
  fetchRoomFurnitureById,
};
