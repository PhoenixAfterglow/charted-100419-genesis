const db = require("../models");


/* PARSING GRAPH DATA FROM CSV
------------------------------ */

function parseDatas(datasToProcess, req) {

    // Create Chart Collection model
    db.ChartCollection.create({
        chartName: req.body.chartName,
        UserId: req.user.id
    }).then(dbChart => {

        datasToProcess.forEach((graph, index) => {

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


    //console.log("datas TO be Process", datasToProcess);

    // const test = datasToProcess.map(elem => elem.month);

    // const datas = datasToProcess.map((elem, index) => elem);
    // datasToProcess.forEach(elem => {

    //     console.log(elem[0]);
    // });


    // const response = await fetch(datasToProces);
    // const datas = await response.text();
    //console.log(datas);
    // const table = datasToProcess.split('\n');
    // console.log("Table", table);
    // table.forEach((row, index) => {

    //     if (index === 0) {

    //         const label = row.split(',').slice(1);

    //         label.forEach(lab => {
    //             chartLabel.label.push(lab);
    //             chartLabel.chartID.push(chartID);
    //         })
    //     } else {
    //         const chartLabelID = 1;
    //         const chartXsID = 1;
    //         // const columns = row[index];
    //         const chartXsData = table[index].split(",").slice(1);
    //         console.log("chartXData", chartXsData);
    //         chartDatas.xsValue.push(chartXsData);
    //         chartDatas.chartLabelID.push(chartLabelID);
    //         chartDatas.chartXsID.push(chartXsID);
    //     }

    //     const columns = row.split(',');

    //     const xs = columns[0];

    //     chartXs.xs.push(xs);
    //     chartXs.chartID.push(chartID);

    //     console.log("ChartXs ", chartXs);
    //     console.log("Chart Label", chartLabel);
    //     console.log("Chart Datas", chartDatas);

    //     // const ysValues = columns[index + 1];
    //     // ys.push(ysValues);
    //     // const _108_5mo = columns[1];
    //     // ys108.push(_108_5mo);
    //     // const _97_5mo = columns[2];
    //     // ys97.push(_97_5mo);
    //     // const _120_6mo = columns[3];
    //     // ys120.push(_120_6mo);
    //     // const _111_6mo = columns[4];
    //     // ys111.push(_111_6mo);
    //     // const _20_7mo = columns[5];
    //     // ys20.push(_20_7mo);
    //     // const _15_7mo = columns[6];
    //     // ys15.push(_15_7mo);
    //     // console.log(months, _108_5mo, _97_5mo, _120_6mo, _111_6mo, _20_7mo, _15_7mo);
    //     //console.log(columns[1]);
    //     //console.log(xs);
    //     // console.log(ys);
    // });
    // //const lab = chartXs.slice(1);
    // //console.log("ChartXs", lab);
    //return { chartLabel, chartXs, chartDatas };
    //return { xs, ys108, ys97, ys120, ys111, ys20, ys15 };
}


module.exports = {
    parseDatas: parseDatas
}