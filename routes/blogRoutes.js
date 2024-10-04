const express = require('express');
const Blog = require('../models/blog');
const blogController = require('../controllers/blogController');

const router = express.Router();

// Add Post
router.get('/add-post', (req, res) => {
    const blog = new Blog({
        title: 'new Title 5',
        snippet: 'about new blog 5',
        body: 'Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.',
    });
    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    res.redirect('/blog');
});
// Get Posts
router.get('/all-posts', (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});
// Get single Post
router.get('/post', (req, res) => {
    Blog.findById('66fa81a7325ae1689157c428')
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});
// Delete Post
router.get('/d/post', (req, res) => {
    Blog.findByIdAndDelete('66fd6e44d76b30dc8389271e')
        .then((result) => {
            if (result) {
                res.send(`Document Deleted: ${result}`);
            } else {
                res.send(`Document not found`);
            }
        })
        .catch((err) => console.log(err));
});
// Delete all Posts
router.get('/d/posts', (req, res) => {
    Blog.deleteMany({})
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

router.get('/blog', blogController.blog_index);

router.get('/create', blogController.blog_create_get);

router.post('/create', blogController.blog_create_post);

router.delete('/blog/:id', blogController.blog_delete);

router.get('/blog/:id', blogController.blog_details);

module.exports = router;
