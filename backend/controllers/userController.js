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

exports.getMusics = async (req, res) => {
  try {
    const { uid } = req.params;
    const { page, limit } = req.query;
    const musics = await service.getMusics(uid, page, limit);
    res.json(musics);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
