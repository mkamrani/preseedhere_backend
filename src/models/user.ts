const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  federated: {
    id: String,
    token: String,
    email: String,
    displayName: String,
    firstName: String,
    lastName: String,
    avatar: String,
    provider: {
      type: String,
      enum: ["facebook", "google", "twitter", "github"],
    }
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
