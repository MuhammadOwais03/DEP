const jwt = require('jsonwebtoken');
const JWT_SECRET = 'y2g:GbXNJF|7|Q,'; // Replace with your secret key

// Middleware to authenticate user
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization']; // Check both cases
  console.log('Headers:', req.headers); // Log all headers to debug
  console.log('Auth Header:', authHeader);
  console.log('accept:', req.headers['accept'])

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.log('Decoded Token:', decoded);
    // Attach the decoded token (user info) to the request object
    req.user = decoded;
    next();
  });
};
