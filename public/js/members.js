$(document).ready(function() {

    /* GENERAL VARIABLES
    ===================================================================== */

    const $chartDisplay = $("canvas#chart");
    const $uploadMessage = $("div#uploadMessage");
    const $uploadDatas = $("div#uploadDatas");
    const $graphMessage = $("div#graphMessage");
    const $chartListDisplay = $("div#chartListDisplay");
    const $graphArea = $("div#graphArea");

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
                let chartDisplay = $("#chartList");

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
                        .addClass("far fa-edit updlnk ml-3")
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
    $(document).on("click", ".updlnk", (event) => {

        const chartId = $(event.currentTarget).attr("data-id");

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
    });


    //Display Chart upload form 
    $(".btnDisplayUpload").on("click", (event) => {

        $uploadMessage.hide();
        $uploadDatas.show();
        $graphMessage.hide();
        $graphArea.hide();
    });



    $('#validatedCustomFile').on('change', function(event) {

        console.log(event);
        //get the file name
        var fileName = $(this).val();
        //replace the "Choose a file" label
        $(this).next('.custom-file-label').html(fileName);
    });

    getChartCollection();

});