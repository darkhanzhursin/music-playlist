const router = require("express").Router();
const userController = require("../controllers/userController");

router.delete("/:uid/music/:mid", userController.deleteMusicFromPlaylist);
router.get("/:uid/musics", userController.getMusics);

module.exports = router;