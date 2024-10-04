const Blog = require('../models/blog');
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((blogs) => {
            res.render('index', { title: 'Blog', blogs });
        })
        .catch((err) => console.log(err));
};
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((post) => {
            console.log(post);
            res.render('single', { title: 'single', post });
        })
        .catch((err) => console.log(err));
};
const blog_create_get = (req, res) => {
    res.render('create', { title: 'create' });
    // res.sendFile('./views/about.html', {root: __dirname})
};
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    res.redirect('/blog');
};
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blog' });
        })
        .catch((err) => console.log(err));
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
};
