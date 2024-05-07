const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './secret_credentials/.env')});

// MongoDB Setup
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_CONNECTION_STRING;
const databaseAndCollection = { db: process.env.MONGO_DB_NAME, collection: process.env.MONGO_COLLECTION };
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const app = express();

/* directory where templates will reside */
app.set("views", path.resolve(__dirname, "templates"));

/* view/templating engine */
app.set("view engine", "ejs");

// ADDING MIDDLEWARE
/* Initializes request.body with post information */ 
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: "putsomethingsecretheredontshow", // use .env for secret string
    })
);

app.get("/home", (req, res) => {
    if(req.session.user != undefined) { // if the user has already logged in, proceed
        console.log("MAKE IT HERE")
        res.send("THIS IS THE HOME PAGE");
    } else {
        res.redirect("/register");
    }
});

app.get("/register", (req, res) => {
    res.send("THIS IS THE REGISTER PAGE")
});



app.listen(process.env.PORT);
console.log(`Web server started and running at  http://localhost:${process.env.PORT}/home`);

process.stdin.setEncoding("utf8"); /* encoding */


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