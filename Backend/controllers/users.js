import User from "../models/user.js";

let signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        success: true,
        message: "Welcome to Proxima!",
        user: registeredUser,
      });
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

let login = async (req, res) => {
  try {
    const redirectUrl = req.session.redirectUrl || "/products";

    delete req.session.redirectUrl;

    return res.status(200).json({
      success: true,
      message: "Welcome to Proxima! You are logged in!",
      user: req.user,
      redirectUrl,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

let logout = (req, res, next) => {
  try {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy(() => {
        res.status(200).json({
          success: true,
          message: "Thank you for using Proxima! You are logged out!",
        });
      });
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

let userAvailableChack = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        user: null,
      });
    }

    res.json({
      user: req.user,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export default {
  signup,
  login,
  logout,
  userAvailableChack,
};
