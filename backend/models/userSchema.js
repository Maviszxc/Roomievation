const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: String,
      required: [true, "User role is needed"],
      default: "customer",
      enum: ["customer", "admin"], // Add role validation
    },
    firstname: {
      type: String,
      required: [true, "Firstname is needed"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Lastname is needed"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is needed"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    address: {
      type: String,
      required: [true, "Address is needed"],
      trim: true,
    },
    contact: {
      type: Number,
      required: [true, "Contact is needed"],
      validate: {
        validator: function (v) {
          return /^\d{10,}$/.test(v.toString());
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
  },
  {
    timestamps: true, // Add timestamps
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
