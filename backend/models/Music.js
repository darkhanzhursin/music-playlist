const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const musicSchema = new Schema({
  src: {
    type: String,
    required: true,
  },
  name: String,
  duration: String,
  year: String,
  author: String,
});

module.exports = mongoose.model("Music", musicSchema);