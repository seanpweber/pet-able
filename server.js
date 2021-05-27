const session = require('express-session')
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const route = require('./controllers');
const app = express();
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection.js");
const PORT = process.env.PORT || 3001;
const sess = {
    secret: 'Super secret secret',
    // secret: process.env.DB_PASSWORD,
    cookie: { },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};



app.use(session(sess));

const hbs = exphbs.create({ extname: '.hbs' });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(route)
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(express.static('public'))


app.use('/', (req, res) => {
    res.render('user', {layout: 'main'});
});

sequelize.sync({force: false}).then(() => {
    app.listen(7000, () => {
    console.log('The web server has started on port 7000');
})
})





// in js save user submitted data to an object
// send the object to the post route
// on back end make a post route for sign up
// do a User.create to connect the sign up to the user model, pass in the object (req.body) that was sent from front end