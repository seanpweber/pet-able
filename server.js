const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

const hbs = exphbs.create({ extname: '.hbs' });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* app.get('/', function (req, res) {
    res.render('home', {
        pets: [
            {
                name: "Sparky",
                breed: "Pug",
                age: "5",
                weight: "15",
                disability: "Amputee",
                location: "ASPCA"
            }
            {
                name: "Max",
                breed: "Pitbull",
                age: "7",
                weight: "55",
                disability: "Deaf",
                location: "Social-Tees"
            }
            {
                name: "Gizmo",
                breed: "Yorkshire Terrier",
                age: "5",
                weight: "15",
                disability: "Hind-limb paralysis",
                location: "ASPCA"
            }
        ]
    });
}); */

app.get('/', (req, res) => {
    res.render('petcard', {layout: 'findadopt'});
});

app.listen(7000, () => {
    console.log('The web server has started on port 7000');
});