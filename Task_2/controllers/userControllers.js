const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = 'y2g:GbXNJF|7|Q,'; // Replace with your secret key

// User registration
exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  db.query('SELECT * FROM users WHERE email = ?', [email],async (err, results) => {
    if (err) { console.log("E!"); return res.status(500).json({ error: err }) };
    if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) { console.log("E2", err); return res.status(500).json({ error: err }); };

      // Insert the new user into the database
      db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err) => {
          if (err) { console.log("E3"); return res.status(500).json({ error: err }); };
          res.json({ message: 'User registered successfully' });
        });
    });

    
  });
};

// User login
exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.headers)
  // Check if the user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = results[0];

    // Compare the password with the hashed password stored in the database
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err });
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Login successful', token });
    });
  });
};
