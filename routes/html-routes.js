// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: 'public/datas/' });
const fs = require("fs");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/login", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/signup", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/members.html"));

    });

    /* POST saveblog router. */
    app.post('/members', isAuthenticated, upload.single('uploadCsvDatas'), function(req, res, next) {

        console.log(req.file.filename);
        const uploadedFile = req.file.filename;

        new Promise((resolve, reject) => {

            fs.readFile(`public/datas/${uploadedFile}`, 'utf8',
                function(err, datas) {
                    if (err) reject(err);

                    console.log(datas);




                });

            return resolve()
        }).catch(console.log);


        res.sendFile(path.join(__dirname, "../public/members.html"));
    });

};