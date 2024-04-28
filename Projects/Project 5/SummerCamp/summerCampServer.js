;const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const portNumber = process.argv[2];
const httpSuccessStatus = 200;

/* directory where templates will reside */
app.set("views", path.resolve(__dirname, "templates"));

/* view/templating engine */
app.set("view engine", "ejs");

/* Initializes request.body with post information */ 
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/apply", (req, res) => {
    res.render("application")
});

app.post("/processApplication", (req, res) => {
    const variables = {name: req.body.name, 
                        email: req.body.email,
                        gpa: req.body.gpa,
                        backInfo: req.body.backgroundInfo,
                        time: new Date()};
    res.render("processApplication", variables)
});

app.get("/reviewApplication", (req, res) => {
    res.render("reviewApplication");
});

app.post("/processReviewApplication", (req, res) => { /* Finish this */
    res.render("processReviewApplication");
});

app.get("/adminGFA", (req, res) => {
    res.render("adminGFA")
});

app.post("/processAdminGFA", (req, res) => { /* Finish this */
    res.render("processAdminGFA");
});

app.get("/adminRemove", (req, res) => {
    res.render("adminRemove")
});

app.listen(portNumber);
console.log(`Web server started and running at http://localhost:${portNumber}`);

process.stdin.setEncoding("utf8"); /* encoding */

// should add a case here to see if everyting is a valid call

const prompt = "Stop to shutdown the server: ";
process.stdout.write(prompt);
process.stdin.on('readable', function () {
    const dataInput = process.stdin.read();
    if (dataInput !==null) {
        const command = dataInput.trim();
        if (command === "stop") {
            console.log("Shutting down the server");
            process.exit(0);
        } else {
            console.log(`Invalid command: ${command}`);
        }
        process.stdout.write(prompt);
        process.stdin.resume();
    }
});