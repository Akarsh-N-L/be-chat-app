import {
  loginSchema,
  signUpSchema,
} from "../utils/validators/auth.validator.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const signUp = async (req, res) => {
  try {
    const { error } = await signUpSchema.validate(req.body);
    if (error) throw new Error(`Invalid data`);

    const { username, password, fullName, gender, confirmPassword } = req.body;
    if (password !== confirmPassword) throw new Error(`Passwords do not match`);

    const user = await User.findOne({ username });
    if (user) throw new Error(`User already exists`);

    const profilePic =
      gender === `male`
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: username,
      password: hashedPassword,
      fullName: fullName,
      gender: gender,
      profilePicture: profilePic,
    });

    generateToken(newUser._id, res);

    console.log(`[signUp] User created successfully: ${username}.`);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.log(`[signUp] Error while creating user.`, err);
    res.status(500).json({
      success: false,
      message: `something went wrong`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { error } = await loginSchema.validate(req.body);
    if (error) throw new Error(`Invalid data`);
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isCorrectPassword = await bcrypt.compare(
      password,
      user.password || "",
    );

    if (!user || !isCorrectPassword)
      throw new Error(`Invalid username or password`);

    generateToken(username, res);
    console.log(`[login] User login successfully: ${username}.`);
    res.status(201).json({
      success: true,
      message: "User login successfully",
      data: {
        username: user.username,
        profilePicture: user.profilePicture,
        fullName: user.fullName,
        _id: user._id,
      },
    });
  } catch (err) {
    console.log(`[login] Error while logging in.`, err);
    res.status(500).json({
      success: false,
      message: `something went wrong`,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie(`jwt`, "", { maxAge: 0 });
    console.log(`[logout] User logout successfully`);
    res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (err) {
    console.log(`[logout] Error while logging out.`, err);
    res.status(500).json({
      success: false,
      message: `something went wrong`,
    });
  }
};

export { signUp, login, logout };
