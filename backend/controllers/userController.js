const service = require("../services/userService");

exports.deleteMusicFromPlaylist = async (req, res) => {
  try {
    const { uid, mid } = req.params;
    await service.deleteMusicFromPlaylist(uid, mid);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllMusics = async (req, res) => {
  try {
    const { uid } = req.params;
    const { page, limit } = req.query;
    const musicsObj = await service.getAllMusics(uid, page, limit);
    res.json(musicsObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlaylist = async (req, res) => {
  try {
    const { uid } = req.params;
    const playlist = await service.getPlaylist(uid);
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToPlaylist = async (req, res) => {
  try {
    const { title, author, userId } = req.body;
    const playlist = await service.addToPlaylist(title, author, userId);
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
