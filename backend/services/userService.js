
const User = require("../models/User");

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