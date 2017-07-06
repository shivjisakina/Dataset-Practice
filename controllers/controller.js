var mysql = require("mysql");


module.exports = function (app) {

    // Creating the connection to the mysql database
    var connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: '',
        database: 'movehub'
    });

    app.get("/", function(req, res) {
        connection.query("SELECT * FROM `cities`;", function(err, data) {

            if (err) {
                throw err;
            }

            res.render("index", {cities: data});

        });
    });

    app.post("/", function(req, res) {
        connection.query("INSERT INTO cities (city) VALUES (?)", [req.body.City],
            function(err, result) {
                if (err) {
                    throw err;
                }
                res.redirect("/")
            });
    });

    app.post("/delete/:id", function(req, res) {
        connection.query("DELETE FROM quotes WHERE City = ?", [req.params.City], function(err, result) {

            if (err) {
                throw err;
            }

            res.redirect("/")

        });
    });

    app.post("/update", function(req, res) {

        connection.query("UPDATE cities SET City = ? Country = ? WHERE City = ?",
            [req.body.cities, req.body.countries, req.body.cities], function(err, result) {
                if (err) {
                    throw err;
                }

                res.redirect("/")

            });
    });

}

