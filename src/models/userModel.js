import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Plz provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Plz provide a username"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Plz provide a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Plz provide a password"],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: Date,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
