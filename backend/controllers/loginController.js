const User = require("../models/User");

exports.handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  if (foundUser.password === password) {
    const timeElapsed = Date.now();
    res.status(200).send({
      success: true,
      message: "Successfully logged in!",
      username,
      date: new Date(timeElapsed),
    });
  } else {
    res.status(403).json({
      message: "Incorrect password.",
      success: false,
    });
  }
};
