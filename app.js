const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// Register View Engine
app.set('view engine', 'ejs');
app.set('views', 'templates');

// Connect to MongoDB
const dbURI =
    'mongodb+srv://user:123456sSa@cluster0.szqar.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0';
mongoose
    .connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// Middlewate and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// app.use(morgan('combined'));

// app.use((req, res, next)=> {
//     console.log('New Request was Made:');
//     console.log('Host:', req.hostname);
//     console.log('Path:', req.path);
//     console.log('Method:', req.method);
//     next()
// })

// Add Post
app.get('/add-post', (req, res) => {
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
app.get('/all-posts', (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});
// Get single Post
app.get('/post', (req, res) => {
    Blog.findById('66fa81a7325ae1689157c428')
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});
// Delete Post
app.get('/d/post', (req, res) => {
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
app.get('/d/posts', (req, res) => {
    Blog.deleteMany({})
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get('/', (req, res) => {
    // const blogs = [
    //     { title: 'title one', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
    //     { title: 'title two', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
    //     { title: 'title three', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
    // ];
    // res.render('index', { title: 'Home', blogs });
    // res.sendFile('./views/index.html', {root: __dirname})
    res.redirect('/blog');
});
app.get('/blog', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((blogs) => {
            res.render('index', { title: 'Blog', blogs });
        })
        .catch((err) => console.log(err));
});
app.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((post) => {
            console.log(post);
            res.render('single', { title: 'single', post });
        })
        .catch((err) => console.log(err));
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'about' });
    // res.sendFile('./views/about.html', {root: __dirname})
});
app.get('/create', (req, res) => {
    res.render('create', { title: 'create' });
    // res.sendFile('./views/about.html', {root: __dirname})
});
app.post('/create', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    res.redirect('/blog');
});
app.delete('/blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blog' });
        })
        .catch((err) => console.log(err));
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
    // res.sendFile('./views/404.html', {root: __dirname})
});

// redirect
// app.get('/about-us', (req, res)=>{
//     res.redirect('/about')
// })
