const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomFurnitureSchema = new Schema({
  roomID: {
    type: String,
    required: [true, "Room ID is needed"],
    index: true,
  },
  name: {
    type: String,
    required: [true, "Name is needed"],
  },
  description: {
    type: String,
    required: [true, "Description is needed"],
  },
  colorscheme: {
    type: [String],
    required: [true, "Color scheme is needed"],
  },
  size: {
    type: [String],
    required: [true, "Size is needed"],
  },
  stock: {
    type: Number,
    required: [true, "Stock is needed"],
  },
  availability: {
    type: Boolean,
    required: [true, "Availability is needed"],
  },
  price: {
    type: Number,
    required: [true, "Price is needed"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

const RoomFurnitures = mongoose.model("RoomFurnitures", roomFurnitureSchema);
module.exports = RoomFurnitures;
