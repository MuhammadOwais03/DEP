const db = require('../config/db');

// Create a new comment
exports.createComment = (req, res) => {
  const { comment_text, user_id } = req.body;
  const postId = req.params.id;
  db.query('INSERT INTO comments (comment_text, post_id, user_id) VALUES (?, ?, ?)', 
    [comment_text, postId, user_id], 
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: 'Comment added successfully', commentId: results.insertId });
    });
};

// Get comments for a specific post
exports.getComments = (req, res) => {
  const postId = req.params.id;
  db.query('SELECT * FROM comments WHERE post_id = ?', [postId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};
