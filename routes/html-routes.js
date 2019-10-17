// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: 'public/datas/' });
const fs = require("fs");
const oFunc = require('../functions/functions.js');
const csv = require('csv-parser');
const db = require('../models');

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

        let charted = {
            "graphName": [],
            "graphLabel": [],
            "graphXs": [],
            "graphYxValue": []
        };

        //getting the chart collection from the database
        db.ChartCollection.findAll({
            where: {
                UserId: req.user.id
            }
        }).then(gCollection => {

            gCollection.forEach(graphCollect => {

                //adding the graph name to the object array
                let graphName = graphCollect.dataValues.chartName;
                console.log("graph Name", graphName)
                charted.graphName.push(graphName);
                console.log("Charted", charted);
            });

            //res.json(dbTodo);
            return gCollection;
        }).then(chart => {

            let cId = [];

            //getting back the chart ID to use for graph label retreival 
            chart.forEach(chartId => {

                cId.push(chartId.dataValues.id)
            });

            // getting all the graph label
            db.Graph.findAll({
                where: {
                    ChartCollectionId: cId
                }
            }).then(chart => {

                chart.forEach(chartDatas => {

                    let graphLabel = chartDatas.dataValues.graphLabel;
                    console.log("Graph Label", graphLabel);
                    charted.graphLabel.push(graphLabel);

                    console.log("Charted", charted);

                })
                return chart;
            }).then(xsValue => {
                let graphId = [];
                xsValue.forEach(xs => {

                    graphId.push(xs.dataValues.id);
                });
                // getting the xs and ys values
                db.DataXYPair.findAll({
                    where: {
                        graphId: graphId
                    }
                }).then(xsYsV => {

                    xsYsV.forEach(xsYs => {

                        console.log(xsYs.dataValues);
                        const xsValue = xsYs.dataValues.xValue;
                        const ysValue = xsYs.dataValues.yValue;

                        charted.graphXs.push(xsValue);
                        charted.graphYxValue.push(ysValue);
                    })
                    console.log(charted);
                })

            })
        })
        console.log(charted);
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

                    oFunc.parseDatas(results, req);

                });


            return resolve()
        }).catch(console.log);


        res.sendFile(path.join(__dirname, "../public/members.html"));
    });

};