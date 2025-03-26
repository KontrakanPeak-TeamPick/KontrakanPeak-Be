const userModel = require("../models/UserModels");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const foundUser = await userModel.findOne({ 
      where: {
        email: req.body.email
      }
    });

    if (!foundUser) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const userId = foundUser.id;
    const name = foundUser.name;
    const email = foundUser.email;

    const accesstoken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    await foundUser.update({ refreshToken }); 

    res.json({ accesstoken });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, Login };
