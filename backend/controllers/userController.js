import User from '../models/userModel.js';
import AppError from '../utils/appError.js';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// @desc    Get user profile
// @route   GET /api/user/getMe
// @access  Private (Requires JWT)

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const createUser = (req, res) => {
  res.status(500).json({
    message: 'This route is not defined! Please use signup instead.',
  });
};

// @desc    Update user profile
// @route   GET /api/user/updateMe
// @access  Private (Requires JWT)

export const updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route not updating password. Please use / updatePassword',
        400
      )
    );
  }
  const filteredBody = filterObj(req.body, 'name', 'email', 'profileImageUrl');

  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
      req.file.filename
    }`;
    filteredBody.profileImageUrl = imageUrl;
  }

  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  await user.save();
  res.status(201).json({
    user,
  });
};

export const deleteMe = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    user: null,
  });
};
