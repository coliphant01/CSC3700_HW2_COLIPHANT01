const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Require routes
const surveyRoutes = require('./routes/survey');

// Set view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use(surveyRoutes);

app.get('/', (req, res) => {
    res.redirect('/survey');
});

// Handle 404s
app.use((req, res, next) => {
    res.status(404).render('notFound', {
        pageTitle: 'Page Not Found',
        from: 'error'
    });
});

const port = 3002;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

module.exports = app;