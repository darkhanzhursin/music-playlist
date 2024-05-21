const User = require("../models/User");
const Music = require("../models/Music");

exports.deleteMusicFromPlaylist = async (uid, mid) => {
  const user = await User.findOne({ _id: uid }).exec();
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.playList.some((music) => music._id == mid)) {
    throw new Error("Music not found in the playlist");
  }
  user.playList.pull({ _id: mid });
  user.save();
};

exports.getMusics = async (uid, page, limit) => {
  const user = await User.findOne({ _id: uid }).exec();
  if (!user) {
    throw new Error("User not found");
  }
  const musics = await Music.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  return musics;
};

exports.addToPlaylist = async (title, author, userId) => {
  const user = await User.findOne({ id: userId }).exec();
  if (!user) {
    throw new Error("User not found");
  }
  const music = await Music.findOne({ name: title, author }).exec();
  if (!music) {
    throw new Error("Music not found");
  }
  user.playList.push(music);
  return user.playList;
};
