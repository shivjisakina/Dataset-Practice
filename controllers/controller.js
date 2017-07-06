var mysql = require("mysql");


module.exports = function (app) {

    // Creating the connection to the mysql database
    var connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: '',
        database: 'movehub'
    });

    app.get("/", function(req, res){
        connection.query("SELECT * FROM `cities` JOIN `cost` WHERE `cities`.`City` = `cost`.`City` LIMIT 10;",
            function(err, data){
                if (err) {
                    throw err;
                }

                res.render("index", {cities: data, cost: data});

        });
    });

    app.post("/", function(req, res) {
        connection.query("INSERT INTO cities (City, Country) VALUES (?, ?)", [req.body.cities, req.body.countries],
            function(err, result) {
                if (err) {
                    throw err;
                }
                res.redirect("/")
            });
    });

}

