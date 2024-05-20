const User = require("../models/User");

exports.handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // create and store the new user
    const newUser = await User.create({
      username: username,
      password: password,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
