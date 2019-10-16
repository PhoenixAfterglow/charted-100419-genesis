const csv = require('csv-parser')
const fs = require('fs')
var db = require("../models");
const results = [];
// require('console.table');
// db.sequelize.sync().then(function() {

fs.createReadStream('daffy2.csv')
    .pipe(csv())
    .on('data', (data) => {
        console.log(data);
        // db.ChartCollection.create({
        //     chartName: "chicken Grass Consumption"
        // }).then(function(dbChart) {
        //     // We have access to the new todo as an argument inside of the callback function
        //     // res.json(dbChart);
        //     console.log(dbChart);
        // });
        // Create a ChartCollection.
        // Loop through the data.
        // Each object will be a Graph object, therefore,
        // Create a Graph.
        // Loop through the object forEach value after 0 index, therefore,
        // Create new DataXYPair.
        //console.log(data);
    })
    .on('end', () => {
        // console.log(results);




    });

//{108 5 month chickens: 26 eggs, 35.2, 29.9, 

//   Month, May, June, July, August, September
// 108 5mo, 26, 35.2, 29.9, 25.6, 7.9
// 97 5mo, 0, 33.1, 27.5, 22.3, 19.1
// 120 6mo, 0, 22.7, 33.1, 26.8, 20.2
// 111 6mo, 0, 18.5, 55.4, 36.2, 29.6

// Month,108 5mo
// May,26
// June,35.2
// July,29.9
// August,25.6
// September,7.9


// });