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

        // //getting the chart collection from the database
        // db.ChartCollection.findAll({
        //     where: {
        //         UserId: req.user.id
        //     }
        // }).then(gCollection => {

        //     gCollection.forEach(graphCollect => {

        //         //adding the graph name to the object array
        //         let graphName = graphCollect.dataValues.chartName;

        //         charted.graphName = graphName;

        //     });

        //     //res.json(dbTodo);
        //     return gCollection;
        // }).then(chart => {

        //     let cId = [];

        //     //getting back the chart ID to use for graph label retreival 
        //     chart.forEach(chartId => {

        //         cId.push(chartId.dataValues.id)
        //     });

        //     // getting all the graph label
        //     db.Graph.findAll({
        //         where: {
        //             ChartCollectionId: cId
        //         }
        //     }).then(chart => {

        //         chart.forEach(chartDatas => {

        //             let graphLabel = chartDatas.dataValues.graphLabel;

        //             charted.dataSet.datasets[0].label = graphLabel;

        //             db.DataXYPair.findAll({
        //                 where: {
        //                     graphId: chartDatas.dataValues.id
        //                 }
        //             }).then(xsYsValue => {

        //                 xsYsValue.forEach(xsYs => {

        //                   let dSet = {
        //                     "label": '108 5mo',
        //                     "data": [26, 35.2,  29.9, 25.6, 7.9],
        //                     "fill": false,
        //                     "backgroundColor": 'rgba(255, 99, 132, 0.2)',
        //                     "borderColor": 'rgba(255, 99, 132, 1)',
        //                     "borderWidth": 1
        //                    }

        //                     charted.dataSet.datasets[0].data.push(xsYs.dataValues.yValue);
        //                     charted.dataSet.labels.push(xsYs.dataValues.xValue)

        //                 });

        //             });

        //             console.log("Charted", charted);
        //             console.log("Charted Labels", charted.dataSet.labels);
        //             console.log("Charted Data", charted.dataSet.datasets[0].data);
        //             console.log("Charted Label", charted.dataSet.datasets[0].label);


        //         })
        //         return chart;
        //     })
        // });

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