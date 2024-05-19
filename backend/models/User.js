const mongoose = require("mongoose");
const Music = require("./Music");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  playList: [Music],
});

module.exports = mongoose.model("User", userSchema);
