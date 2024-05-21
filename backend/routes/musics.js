const router = require("express").Router();
const musicController = require("../controllers/musicController.js");

router.post("/", musicController.add);
module.exports = router;
