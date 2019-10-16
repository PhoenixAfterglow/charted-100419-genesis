// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: 'public/datas/' });
const fs = require("fs");
const oFunc = require('../functions/functions.js');
const csv = require('csv-parser');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/login", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/signup", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/members.html"));

    });

    /* POST saveblog router. */
    app.post('/members', isAuthenticated, upload.single('uploadCsvDatas'), function(req, res, next) {

        const uploadedFile = req.file.filename;

        new Promise((resolve, reject) => {

            let results = [];
            fs.createReadStream(`public/datas/${uploadedFile}`)
                .pipe(csv())
                .on('data', (data) => { results.push(data); })
                .on('end', () => {

                    db.ChartCollection.create({
                        chartName: "chicken Grass Consumption",
                        UserId: req.user.id
                    }).then(function(dbChart) {

                        results.forEach((graph, index) => {

                            const graphkeys = Object.keys(graph);

                            db.Graph.create({
                                graphLabel: graph[graphkeys[0]], //braquet notation
                                xName: graphkeys[0],
                                ChartCollectionId: dbChart.id

                            }).then(dbGraph => {

                                graphkeys.forEach((key, index) => {

                                    if (index > 0) {

                                        db.DataXYPair.create({
                                            xValue: graphkeys[index],
                                            yValue: graph[graphkeys[index]],
                                            GraphId: dbGraph.id
                                        })
                                    }
                                });
                            });
                        });
                    });

                });


            return resolve()
        }).catch(console.log);


        res.sendFile(path.join(__dirname, "../public/members.html"));
    });

};