$(document).ready(function() {

    /* GENERAL VARIABLES
    ===================================================================== */

    const $chartDisplay = $("canvas#chart");
    const $uploadMessage = $("div#uploadMessage");
    const $uploadDatas = $("div#uploadDatas");
    const $graphMessage = $("div#graphMessage");
    const $chartListDisplay = $("div#chartListDisplay");
    const chartDisplay = $("#chartList");
    const $graphArea = $("div#graphArea");
    const $graphDataInfo = $("div#graphDataInfo");
    const $graphUpdate = $("div#graphUpdate");

    $chartDisplay.hide();
    $uploadDatas.hide();
    $uploadMessage.hide();
    $graphMessage.hide();
    $chartListDisplay.hide();


    /* FUNCTIONS
    ===================================================================== */

    function displayGraphDatas(datasP) {

        $chartDisplay.show();

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


    function getChartCollection() {

        $.get("/api/chartcollection").then((datas) => {
            console.log(datas);
            if (datas.length > 0) {

                $graphMessage.show();
                $chartListDisplay.show();
                let ul = $("<ul>").addClass("list-group list-group-flush");

                datas.forEach(chart => {

                    let li = $("<li>")
                        .addClass("list-group-item");

                    let link = $("<span>")
                        .attr({
                            "data-id": chart.id
                        })
                        .addClass("nav-item chartlink")
                        .text(chart.chartName)
                        .appendTo(li);

                    let updateLnk = $("<i>")
                        .addClass("far fa-edit updatelink ml-3")
                        .attr({
                            "data-id": chart.id
                        })
                        .appendTo(li);

                    let deleteLnk = $("<i>")
                        .addClass("far fa-trash-alt dellnk ml-3")
                        .attr({
                            "data-id": chart.id
                        })
                        .appendTo(li);

                    li.appendTo(ul);
                });

                ul.appendTo(chartDisplay);

            } else {
                $uploadMessage.show();
                $chartListDisplay.hide();
                $graphMessage.hide();
                $graphArea.hide();
                $uploadDatas.hide();
            }

        });

    }

    // Delete Chart Collection
    function deleteChartCollection(chartId) {

        $.ajax({
                method: "DELETE",
                url: `/api/chart/${chartId}`
            })
            .then(getChartCollection);

    }



    // Update Chart Information
    $(document).on("click", ".updatelink", (event) => {

        $graphDataInfo.empty();
        $graphUpdate.show();

        const chartId = $(event.currentTarget).attr("data-id");

        $.get(`/api/chart/${chartId}`, (chartDatas) => {

            console.log(chartDatas);

            let graphNameTitle = $("<p>")
                .html(`Graph Name: ${chartDatas.graphName}<br><br>`)
                .appendTo($graphDataInfo)
                .addClass("mb-3 white-text");

            chartDatas.dataSet.forEach(datas => {

                let graphLabel = $("<p>")
                    .html(`Graph Label: ${datas.label}`)
                    .appendTo($graphDataInfo);

                let yValueUl = $("<ul>");

                datas.data.forEach(ylist => {

                    let yValueList = $("<li>")
                        .html(ylist)
                        .addClass("white-text")
                        .appendTo(yValueUl);
                });

                yValueUl.appendTo($graphDataInfo);

                console.log(datas);

            });


            $graphMessage.hide();
            $uploadDatas.hide();
            $graphArea.hide();
        });

        console.log(chartId);
    });

    /* API CALLS
     ===================================================================== */

    //Get information on the connected user and Display User name
    $.get("/api/user_data").then(function(data) {

        $(".member-name").text(data.username);
    });

    // Get Chart information

    $(document).on("click", ".chartlink", (event) => {

        const chartId = $(event.currentTarget).attr("data-id");

        $.get(`/api/chart/${chartId}`, (chartDatas) => {

            console.log(chartDatas);
            displayGraphDatas(chartDatas);
            $uploadDatas.hide();
            $graphMessage.show();
            $graphArea.show();
        });

    });


    /* EVENTS
      ===================================================================== */


    // Delete Chart Information
    $(document).on("click", ".dellnk", (event) => {

        const chartId = $(event.currentTarget).attr("data-id");

        deleteChartCollection(chartId);
        chartDisplay.empty();
    });


    //Display Chart upload form 
    $(".btnDisplayUpload").on("click", (event) => {

        $uploadMessage.hide();
        $uploadDatas.show();
        $graphMessage.hide();
        $graphArea.hide();
        $graphUpdate.hide();
    });

    // On File upload change the label name to file name
    $('#validatedCustomFile').on('change', function(event) {

        console.log(event);
        //get the file name
        var fileName = $(this).val();
        //replace the "Choose a file" label
        $(this).next('.custom-file-label').html(fileName);
    });



    getChartCollection();

});