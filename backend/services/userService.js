const User = require("../models/User");
const Music = require("../models/Music");

exports.deleteMusicFromPlaylist = async (uid, title, author) => {
  const user = await User.findOne({ _id: uid }).exec();
  if (!user) {
    throw new Error("User not found");
  }
  const promise = user.playList.some((music) => {
    return title === music.title && author === music.author;
  });
  if (!promise)
  {
    throw new Error("Music not found in the playlist");
  }
  user.playList.pull({ title, author });
  await user.save();
  return user.playList ?? [];
};

exports.getAllMusics = async (uid, page, limit) => {
  const user = await User.findOne({ _id: uid }).exec();
  if (!user) {
    throw new Error("User not found");
  }
  const musics = await Music.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  const total = await Music.countDocuments({}).exec();
  return { musics, total };
};

exports.getPlaylist = async (uid) => {
  const user = await User.findOne({ _id: uid }).exec();
  if (!user) {
    throw new Error("User not found");
  }
  return user.playList;
};

exports.addToPlaylist = async (title, author, userId) => {
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error("User not found");
  }
  const music = await Music.findOne({ title, author }).exec();
  if (!music) {
    throw new Error("Music not found");
  }
  user.playList.push(music);
  user.save();
  return user.playList;
};
