const express = require("express");
const router = express.Router();
const roomFurnitureController = require("../controllers/roomFurnitureController");

router.get("/", roomFurnitureController.fetchRoomFurnitures);
router.get("/:id", roomFurnitureController.fetchRoomFurnitureById);
router.post("/", roomFurnitureController.addRoomFurniture);
router.put("/:id", roomFurnitureController.updateRoomFurniture);
router.delete("/:id", roomFurnitureController.deleteRoomFurniture);

module.exports = router;
