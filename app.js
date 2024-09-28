const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// Register View Engine
app.set('view engine', 'ejs');
app.set('views', 'templates');

// listen for request
app.listen(3000);

// Middlewate and static files
app.use(express.static('public'))

app.use(morgan('combined'))

// app.use((req, res, next)=> {
//     console.log('New Request was Made:');
//     console.log('Host:', req.hostname);
//     console.log('Path:', req.path);
//     console.log('Method:', req.method);
//     next()
// })

app.get('/', (req, res) => {
    const blogs = [
        { title: 'title one', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
        { title: 'title two', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
        { title: 'title three', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
    ];
    res.render('index', { title: 'Home', blogs });
    // res.sendFile('./views/index.html', {root: __dirname})
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'about' });
    // res.sendFile('./views/about.html', {root: __dirname})
});
app.get('/create', (req, res) => {
    res.render('create', { title: 'create' });
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
