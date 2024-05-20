const router = require("express").Router();
const userController = require("../controllers/userController");

router.delete("/:uid/music/:mid", userController.deleteMusicFromPlaylist);

module.exports = router;