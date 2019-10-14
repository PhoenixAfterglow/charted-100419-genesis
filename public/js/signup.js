$(document).ready(function() {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const username = $("input#userName-input");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            username: username.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        console.log(userData);
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.username, userData.email, userData.password);
        username.val("");
        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(username, email, password) {
        $.post("/api/signup", {
                username: username,
                email: email,
                password: password
            })
            .then(function(data) {
                window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});