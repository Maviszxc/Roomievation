const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomModelsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is needed"],
  },
  description: {
    type: String,
    required: [true, "Description is needed"],
  },
  type: {
    type: String,
    required: [true, "Type is needed"],
  },
  theme: {
    type: [String],
    required: [true, "Theme is needed"],
  },
  colorscheme: {
    type: [String],
    required: [true, "Color scheme is needed"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

const RoomModels = mongoose.model("RoomModels", roomModelsSchema);
module.exports = RoomModels;
