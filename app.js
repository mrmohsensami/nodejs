const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

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

// blog routes
app.use(blogRoutes);

app.get('/about', (req, res) => {
    res.render('about', { title: 'about' });
    // res.sendFile('./views/about.html', {root: __dirname})
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
