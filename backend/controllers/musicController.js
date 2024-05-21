const Music = require("../models/Music");

exports.add = async (req, res) => {
  const { src, title, duration, author, year, genre } = req.body;
  try {
    // create and store new music
    const newMusic = await Music.create({
      src,
      title,
      duration,
      author,
      year,
      genre,
    });
    res.status(201).json(newMusic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
