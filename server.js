// NPM requires
var express = require('express');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mysql = require("mysql");

// Making my port 3000 or process.env.PORT for heroku deployment
var PORT = process.env.PORT || 3000;

// Creating the connection to the mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movehub'
});

// Connecting to the mysql database
connection.connect(function (error) {
    if (error) {
        throw error;
    }
    console.log('Connected to MySQL server, as ID = ', connection.threadId);
});

// express npm package
var app = express();

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// express-handlebars npm package
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body-parser npm package
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Use all of the static files in the public folder
app.use(express.static('app/public'));

// requiring my  controller js file
require('./controllers/controller.js')(app);

// Listening to the port
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})