import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { promisify } from 'util';
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      // const decoded = await promisify(jwt.verify)(
      //   token,
      //   process.env.JWT_SECRET
      // );
      // req.user = await User.findById(decoded.id).select('-password');
      // next();
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        res.status(401).json({
          message: 'You are not logged in! Please login to get access.',
        })
      );
    }
    // Token verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id).select('-password');

    if (!currentUser) {
      return next(
        res.status(401).json({ message: 'Not authorized, no token' })
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token failed ', error: err.message });
  }
};
