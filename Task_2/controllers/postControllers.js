const db = require('../config/db');

// Get all posts
exports.getAllPosts = (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

// Create a new post
exports.createPost = (req, res) => {
  const { title, content, author_id } = req.body;
  db.query('INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)', 
    [title, content, author_id], 
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: 'Post created successfully', postId: results.insertId });
    });
};

// Update a post
exports.updatePost = (req, res) => {
  const { title, content } = req.body;
  const postId = req.params.id;
  db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', 
    [title, content, postId], 
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: 'Post updated successfully' });
    });
};

// Delete a post
exports.deletePost = (req, res) => {
  const postId = req.params.id;
  db.query('DELETE FROM posts WHERE id = ?', [postId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Post deleted successfully' });
  });
};
