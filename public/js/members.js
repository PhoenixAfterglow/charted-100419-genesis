$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        $(".member-name").text(data.username);
    });

    /* CHART
    ---------------------- */

    async function setup() {
        const dSetArr = [];
        const backgroundColor = ['rgba(255, 99, 132, 0.2)', 'rgba(167,105,0,0.4)', 'rgba(220,220,220,0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'];
        const borderColor = ['rgba(255, 99, 132, 1)', 'rgb(167, 105, 0)', 'rgba(220,220,220,1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'];
        const chickenDatas = await getDatas();

        async function chartDataSet(chickenDatas) {

            console.log("chicken Datas", chickenDatas.chartLabel.label);

            const chartL = chickenDatas.chartLabel.label;
            chartL.forEach((dataSet, index) => {

                console.log(dataSet, index);
                const dSet = {
                    label: dataSet,
                    data: chickenDatas.chartDatas.xsValue,
                    fill: false,
                    backgroundColor: backgroundColor[index],
                    borderColor: borderColor[index],
                    borderWidth: 1
                };
                dSetArr.push(dSet);
            });
            console.log(dSetArr);
            return dSetArr;
        };


        console.log(chickenDatas);
        const ctx = document.getElementById('chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chickenDatas.chartXs.xs.slice(1),
                datasets: await chartDataSet(chickenDatas)
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    /*
    -----------------------  */

    async function getDatas() {
        const chartName = "Chicken Grass";
        const chartID = 1;
        const chartUserID = 1;
        const chartLabel = {
            label: [],
            chartID: []
        };
        const chartXs = {
            xs: [],
            chartID: []
        };
        const chartDatas = {
            xsValue: [],
            chartLabelID: [],
            chartXsID: []
        };
        const response = await fetch('../datas/Grass_Fed_Chickens_grass.csv');
        const datas = await response.text();
        //console.log(datas);
        const table = datas.split('\n');
        //console.log("Table", table);
        table.forEach((row, index) => {

            if (index === 0) {

                const label = row.split(',').slice(1);

                label.forEach(lab => {
                    chartLabel.label.push(lab);
                    chartLabel.chartID.push(chartID);
                })
            } else {
                const chartLabelID = 1;
                const chartXsID = 1;
                const columns = row.split(',');
                const chartXsData = columns[1];

                chartDatas.xsValue.push(chartXsData);
                chartDatas.chartLabelID.push(chartLabelID);
                chartDatas.chartXsID.push(chartXsID);
            }

            const columns = row.split(',');

            const xs = columns[0];

            chartXs.xs.push(xs);
            chartXs.chartID.push(chartID);

            // console.log("ChartXs ", chartXs);
            // console.log("Chart Label", chartLabel);
            // console.log("Chart Datas", chartDatas);

            // const ysValues = columns[index + 1];
            // ys.push(ysValues);
            // const _108_5mo = columns[1];
            // ys108.push(_108_5mo);
            // const _97_5mo = columns[2];
            // ys97.push(_97_5mo);
            // const _120_6mo = columns[3];
            // ys120.push(_120_6mo);
            // const _111_6mo = columns[4];
            // ys111.push(_111_6mo);
            // const _20_7mo = columns[5];
            // ys20.push(_20_7mo);
            // const _15_7mo = columns[6];
            // ys15.push(_15_7mo);
            // console.log(months, _108_5mo, _97_5mo, _120_6mo, _111_6mo, _20_7mo, _15_7mo);
            //console.log(columns[1]);
            //console.log(xs);
            // console.log(ys);
        });
        //const lab = chartXs.slice(1);
        //console.log("ChartXs", lab);
        return { chartLabel, chartXs, chartDatas };
        //return { xs, ys108, ys97, ys120, ys111, ys20, ys15 };
    }

    setup();
});