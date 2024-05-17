const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  playList: [String],
});

module.exports = mongoose.model("User", userSchema);
