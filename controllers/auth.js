const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password} = req.body;
    const user =  User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token , message: "Signup success! Please login."});
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password'});
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    const { _id } = user;
    res.json({ token, user: { _id, email, name} });
  } catch (error) {
    next(error);
  }
};
