// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

    /* LOGIN ROUTES
    ========================================================= */

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function(req, res) {

        db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            .then(function() {
                res.redirect(307, "/api/login");
            })
            .catch(function(err) {
                res.status(401).json(err);
                console.log(err);
            });
    });

    // Route for logging user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });


    /* USER DATAS ROUTES
    ========================================================= */

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            db.User.findOne({
                where: {
                    id: req.user.id
                }
            }).then(function(datas) {
                res.json({
                    username: datas.dataValues.username,
                    email: datas.dataValues.email,
                    id: datas.dataValues.id
                });
            });
        }
    });


    /* CHART DATAS PROCESS ROUTES
    ========================================================= */

    app.get("/api/chartcollection", (req, res) => {

        db.ChartCollection.findAll({
            where: {
                UserId: req.user.id
            },
            include: [db.Graph]
        }).then(listChart => {

            res.json(listChart);
        })

    });

    app.get("/api/chart/:id", (req, res) => {

        const backgroundColor = ['rgba(255, 99, 132, 0.2)', 'rgba(167,105,0,0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(220,220,220,0.2)'];
        const borderColor = ['rgba(255, 99, 132, 1)', 'rgb(167, 105, 0)', 'rgba(153, 102, 255, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(220,220,220,1)'];

        let charted = {
            "graphName": '',
            "graphLabel": [],
            "dataSet": []
        };

        db.ChartCollection.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Graph,
                include: [db.DataXYPair]
            }]
        }).then(dbchart => {

            charted.graphName = dbchart.chartName;

            dbchart.Graphs[0].DataXYPairs.forEach(xyPair => {

                charted.graphLabel.push(xyPair.xValue);

            });

            dbchart.Graphs.forEach((graph, index) => {

                charted.dataSet.push({
                    label: graph.graphLabel,
                    data: graph.DataXYPairs.map(xyPair => xyPair.yValue),
                    "fill": true,
                    "fillOpacity:": .3,
                    "backgroundColor": backgroundColor[index],
                    "borderColor": borderColor[index],
                    "pointBorderColor": borderColor[index],
                    "pointBackgroundColor": backgroundColor[index],
                    "pointHoverBorderColor": borderColor[index],
                    "pointHoverBackgroundColor": backgroundColor[index],
                    "pointBorderWidth": 5,
                    "pointHoverRadius": 5,
                    "pointHoverBorderWidth": 1,
                    "borderWidth": 1
                });
            });

            res.json(charted);
        })

    });

    // DELETE route for deleting Chart
    app.delete("/api/chart/:id", function(req, res) {
        db.ChartCollection.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function(dbChart) {
                res.json(dbChart);
            });
    });
};