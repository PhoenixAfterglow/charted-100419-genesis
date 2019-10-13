$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        $(".member-name").text(data.username);
    });

    /* CHART
    ---------------------- */

    async function setup() {
        const chickenDatas = await getDatas();
        const ctx = document.getElementById('chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chickenDatas.lab,
                datasets: [{
                    label: '108 5mo',
                    data: chickenDatas.ys108,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: '97 5mo',
                    data: chickenDatas.ys97,
                    fill: false,
                    backgroundColor: 'rgba(167,105,0,0.4)',
                    borderColor: 'rgb(167, 105, 0)',
                    borderWidth: 1
                }, {
                    label: '120 6mo',
                    data: chickenDatas.ys120,
                    fill: false,
                    backgroundColor: 'rgba(220,220,220,0.2)',
                    borderColor: 'rgba(220,220,220,1)',
                    borderWidth: 1
                }, {
                    label: '111 6mo',
                    data: chickenDatas.ys111,
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    label: '20 7mo',
                    data: chickenDatas.ys20,
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }, {
                    label: '15 7mo',
                    data: chickenDatas.ys15,
                    fill: false,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
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
        const xs = [];
        const ys = [];
        const ys108 = [];
        const ys97 = [];
        const ys120 = [];
        const ys111 = [];
        const ys20 = [];
        const ys15 = [];
        const response = await fetch('../datas/Grass_Fed_Chickens_grass.csv');
        const datas = await response.text();
        //console.log(datas);
        const table = datas.split('\n');
        table.forEach(row => {
            console.log(row);



            const columns = row.split(',');

            //console.log(columns.length);
            const colLength = columns.length;

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
        const lab = xs.slice(1);
        return { lab };
        //return { xs, ys108, ys97, ys120, ys111, ys20, ys15 };
    }

    setup();
});