const express = require("express");
const bcrypt = require("bcrypt"); // Add this line
const router = express.Router();
const userController = require("../controllers/userController");
const User = require("../models/userSchema");

router.get("/", userController.fetchUsers);
router.post("/login", userController.userLogin);
router.post("/signup", async (req, res) => {
  console.log("Request body:", req.body);

  const { firstname, lastname, username, email, password, contact, address } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !username ||
    !email ||
    !password ||
    !contact ||
    !address
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword, 
      contact,
      address,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: error.message || "Registration failed" });
  }
});

module.exports = router;
