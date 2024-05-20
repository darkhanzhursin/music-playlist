const service = require('../services/userService');

exports.deleteMusicFromPlaylist = async (req, res) => {
    try {
        const { uid, mid } = req.params;
        await service.deleteMusicFromPlaylist(uid, mid);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};