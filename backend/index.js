require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const portNumber = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/pics", express.static(path.join(__dirname, "public/pics")));
app.use("/home/pics", express.static(path.join(__dirname, "home/pics")));

// DB Connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => console.log("Connected to MongoDB"));

// Routes
const userRoute = require("./routes/userRoute");
app.use("/api/v1/users", userRoute);

const roomModelRoute = require("./routes/roomModelRoute");
app.use("/api/v1/roomModels", roomModelRoute);

const roomFurnitureRoute = require("./routes/roomFurnitureRoute");
app.use("/api/v1/roomFurnitures", roomFurnitureRoute);

const addToCartRoute = require("./routes/addToCartRoute");
app.use("/api/v1/cart", addToCartRoute);

const orderRoute = require("./routes/orderRoute");
app.use("/api/v1/orders", orderRoute);

app.listen(portNumber, () => {
  console.log(`Server is running on http://localhost:${portNumber}`);
});
