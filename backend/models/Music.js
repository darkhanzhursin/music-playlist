const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const musicSchema = new Schema({
  src: {
    type: String,
    required: true,
  },
  title: String,
  duration: String,
  year: String,
  author: String,
  genre: String,
});

module.exports = mongoose.model("Music", musicSchema);
