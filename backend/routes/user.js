const router = require("express").Router();
const userController = require("../controllers/userController");

router.delete("/:uid/music/:mid", userController.deleteMusicFromPlaylist);
router.get("/:uid/musics", userController.getMusics);
router.post("/playlist", userController.addToPlaylist);

module.exports = router;
