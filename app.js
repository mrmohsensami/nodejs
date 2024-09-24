const express = require('express');

// express app
const app = express();

// Register View Engine
app.set('view engine', 'ejs');
app.set('views', 'templates');

// listen for request
app.listen(3000);

app.get('/', (req, res) => {
    res.render('index');
    // res.sendFile('./views/index.html', {root: __dirname})
});
app.get('/about', (req, res) => {
    res.render('about');
    // res.sendFile('./views/about.html', {root: __dirname})
});
app.get('/create', (req, res) => {
    res.render('create');
    // res.sendFile('./views/about.html', {root: __dirname})
});

// redirect
// app.get('/about-us', (req, res)=>{
//     res.redirect('/about')
// })

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
    // res.sendFile('./views/404.html', {root: __dirname})
});
