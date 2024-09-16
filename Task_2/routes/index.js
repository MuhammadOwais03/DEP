const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControllers');
const commentController = require('../controllers/commentControllers');
const userController = require('../controllers/userControllers');
const auth = require('../middlewares/auth');


// User registration route
router.post('/register', userController.register);  

// User login route
router.post('/login', userController.login);

// Routes for blog posts
router.get('/posts',auth, postController.getAllPosts);
router.post('/posts', auth, postController.createPost);
router.put('/posts/:id', auth, postController.updatePost);
router.delete('/posts/:id', auth, postController.deletePost);

// Routes for comments
router.post('/posts/:id/comments', auth, commentController.createComment);
router.get('/posts/:id/comments', auth, commentController.getComments);

module.exports = router;
