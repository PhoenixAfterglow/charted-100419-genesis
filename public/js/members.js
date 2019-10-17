$(document).ready(function() {

    const $chartDisplay = $("canvas#chart");
    const graphName = $("input#chartName-input").val().trim();

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {

        $(".member-name").text(data.username);
    });

    $chartDisplay.hide();

    // loginForm.on("submit", function(event) {

    //     $.post("/api/upload", {
    //             graphName: graphName
    //         })
    //         .then(function() {
    //             window.location.replace("/members");
    //             // If there's an error, log the error
    //         })
    //         .catch(function(err) {
    //             console.log(err);
    //         });

    // });


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

        console.log("click", event);

        const chartId = $(event.currentTarget).attr("data-id");

        $.get(`/api/chart/${chartId}`, (chartDatas) => {

            console.log(chartDatas);


        });




    });

});