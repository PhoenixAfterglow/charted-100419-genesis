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

});