const router = require("express").Router();
const userController = require("../controllers/userController");

router.delete("/:uid/music/:mid", userController.deleteMusicFromPlaylist);
router.get("/:uid/musics", userController.getAllMusics);
router.get("/:uid/playlist", userController.getPlaylist);
router.post("/playlist", userController.addToPlaylist);

module.exports = router;
