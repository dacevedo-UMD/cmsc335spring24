const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, 'credentialsDontPost/.env') })  

// MongoDB Setup
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_CONNECTION_STRING;
const databaseAndCollection = {db: process.env.MONGO_DB_NAME, collection: process.env.MONGO_COLLECTION};
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


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

app.post("/processApplication", (req, res) => { // this function doesnt need async because there no data in it that
    const variables = {name: req.body.name,     // replies on the return of insertOneApplication (an async function)
                        email: req.body.email,
                        gpa: req.body.gpa,
                        backInfo: req.body.backgroundInfo,
                        time: new Date()};
    insertOneApplication(variables);
    console.log("data entered = " + variables);
    res.render("processApplication", variables);
});

app.get("/reviewApplication", (req, res) => {
    res.render("reviewApplication");
});

app.post("/processReviewApplication", async (req, res) => { // this function DOES need async because it relies on
    let result = await lookUpOneEntry(req.body.email);      // the data thats returned from lookUpOneEntry()
    if (result) {
        const variables = {name: result.name, 
            email: result.email,
            gpa: result.gpa,
            backInfo: result.backInfo,
            time: result.time};
        res.render("processReviewApplication", variables);
    } else {
        res.status(404).send("<h1>Error: No email found</h1>Return <a href='/'>HOME</a>?");
    }
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

// list of functions to help with processing data into mongoDB
async function insertOneApplication(application) {
    try {
        await client.connect();
       
        /* Inserting one application */
        const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(application);
        console.log(`Entry created with id ${result.insertedId}`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function lookUpOneEntry(emailName) {
    await client.connect();
    let filter = {email: emailName};
    const result = await client.db(databaseAndCollection.db)
                        .collection(databaseAndCollection.collection)
                        .findOne(filter);
    return result;
}

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