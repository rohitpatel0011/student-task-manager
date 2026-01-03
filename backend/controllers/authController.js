const User = require('../models/User');
const jwt = require('jsonwebtoken');

//* Token Generator Helper ========
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'secret123',
    { expiresIn: '7d' }
  );
};


//* Route POST /api/auth/signup ========
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //=== Checking if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    //==== Create User
    const user = await User.create({
      name,
      email,
      password
    });

    //=== Generate Token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
};


//== Route POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //==== Check email and password
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // == Find user & select password explicitly
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    //==== Checking Password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // ==== Generate Token
    const token = generateToken(user._id);

    // ===== Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Login successful',
      user: userResponse,
      token,
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};