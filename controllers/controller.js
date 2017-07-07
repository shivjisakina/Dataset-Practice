var mysql = require("mysql");
var connection;

module.exports = function (app) {


    if (process.end.JAWSDB_URL) {
        connection = mysql.createConnection(process.env.JAWSDB_URL);
    } else {
        connection = mysql.createConnection({
            host: 'bmsyhziszmhf61g1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'iq72tjvr6i2o3uxy	',
            password: 'gfaw48ferx70athj',
            database: 'movehub'
        });
    }

    app.get("/", function (req, res) {
        connection.query("SELECT * FROM `cities` JOIN `cost` WHERE `cities`.`City` = `cost`.`City` LIMIT 10;",
            function (err, data) {
                if (err) {
                    throw err;
                }

                res.render("index", {cities: data, cost: data});

            });
    });

    app.post("/", function (req, res) {
        connection.query("INSERT INTO cities (City, Country) VALUES (?, ?)", [req.body.city, req.body.country],
            function (err, result) {
                if (err) {
                    throw err;
                }
                res.redirect("/")
            });
    });

    app.delete("/", function(req, res) {
        connection.query("DELETE FROM cities WHERE City = ?", [req.body.City], function(err, result) {
            if (err) {
                throw err;
            }
            res.redirect("/");
        });
    });

    app.get("/:City", function(req, res) {
        connection.query("UPDATE cities SET City = ?, Country = ? WHERE City = ?", [
            req.body.cityu, req.body.countryu, req.params.cityu], function(err, result) {
            if (err) {
                throw err;
            }
            res.redirect("/");
        });
    });

}

