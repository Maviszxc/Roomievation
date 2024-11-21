const express = require("express");
const router = express.Router();
const roomModelController = require("../controllers/roomModelController");

router.get("/", roomModelController.fetchRoomModels);
router.get("/:id", roomModelController.fetchRoomModelById);
router.post("/", roomModelController.addRoomModel);
router.put("/:id", roomModelController.updateRoomModel);
router.delete("/:id", roomModelController.deleteRoomModel);

module.exports = router;
