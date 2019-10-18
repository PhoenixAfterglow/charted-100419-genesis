$(document).ready(function() {

    /* GENERAL VARIABLES
    ===================================================================== */

    const $chartDisplay = $("canvas#chart");
    const graphName = $("input#chartName-input").val().trim();


    $chartDisplay.hide();

    /* FUNCTIONS
    ===================================================================== */

    function displayGraphDatas(datasP) {

        $chartDisplay.show();

        console.log(datasP);
        // const chickenDatas = getDatas(datasP);

        // // Generate datas set for the graph line display
        // async function chartDataSet(chickenDatas) {

        //     const chartL = chickenDatas.chartLabel.label;
        //     chartL.forEach((dataSet, index) => {

        //         //console.log(dataSet, index);
        //         const dSet = {
        //             "label": dataSet,
        //             "data": chickenDatas.chartDatas.xsValue[index],
        //             "fill": false,
        //             "backgroundColor": backgroundColor[index],
        //             "borderColor": borderColor[index],
        //             "borderWidth": 1
        //         };
        //         dSetArr.push(dSet);
        //     });
        //     console.log("dSetArr", dSetArr);
        //     return dSetArr;
        // };

        const ctx = document.getElementById('chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datasP.graphLabel,
                datasets: datasP.dataSet
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


    /* API CALLS
    ===================================================================== */

    //Get information on the connected user and Display User name
    $.get("/api/user_data").then(function(data) {

        $(".member-name").text(data.username);
    });

    $.get("/api/chartcollection").then((datas) => {

        console.log(datas);

        let ul = $("<ul>");
        let chartDisplay = $("#chartList");

        datas.forEach(chart => {

            let li = $("<li>");
            let link = $("<span>").attr({
                "data-id": chart.id
            }).addClass("nav-item chartlink").text(chart.chartName).appendTo(li);
            li.appendTo(ul);
        });

        ul.appendTo(chartDisplay);

    });

    $(document).on("click", ".chartlink", (event) => {

        const chartId = $(event.currentTarget).attr("data-id");

        $.get(`/api/chart/${chartId}`, (chartDatas) => {

            displayGraphDatas(chartDatas);

        });

    });

});