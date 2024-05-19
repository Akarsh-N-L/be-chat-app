import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedUser = req.user._id;
    const allUsers = await User.find({ _id: { $ne: loggedUser } });
    console.log(`[getUsersForSideBar] users found for ${loggedUser} user.`);
    res.status(200).json({
      success: true,
      message: "Users found successfully.",
      data: allUsers,
    });
  } catch (err) {
    console.log(`[getUsersForSideBar] Error while getting users. ${err}`);
    res.status(500).json({
      success: false,
      message: `something went wrong`,
    });
  }
};
