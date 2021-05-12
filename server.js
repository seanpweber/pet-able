const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const route = require('./controllers');

const app = express();

const hbs = exphbs.create({ extname: '.hbs' });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());

app.use(route)
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('petcard', {layout: 'findadopt'});
});

app.listen(7000, () => {
    console.log('The web server has started on port 7000');
});




// in js save user submitted data to an object
// send the object to the post route
// on back end make a post route for sign up
// do a User.create to connect the sign up to the user model, pass in the object (req.body) that was sent from front end