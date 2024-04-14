const http = require('http');
const fs = require('fs');
const path = require("path");
const express = require('express');
const app = express();

const portNumber = 5000;
const httpSuccessStatus = 200;

/* directory where templates will reside */
app.set("views", path.resolve(__dirname, "templates"));

/* view/templating engine */
app.set("view engine", "ejs");

app.get("/", (request, response) => { 
    response.render("index");
});
app.get("/catalog", (request, response) => {
    response.render("displayItems");
});
app.get("/order", (request, response) => { /* You implement */ });
app.post("/order", (request, response) => { /* You implement */ });

app.listen(portNumber, (err) => {
    if (err) {
      console.log("Starting server failed.");
    } else {
      console.log(`To access server: http://localhost:${portNumber}`);
    }
});

process.stdin.setEncoding("utf8"); /* encoding */

if (process.argv.length != 3) { /* checking valid call */
    process.stdout.write(`Usage supermarketServer.js jsonFile`);
    process.exit(1);
}

const prompt = "Type itemsList or stop to shutdown the server: "
process.stdout.write(prompt);
process.stdin.on('readable', function () {
    const dataInput = process.stdin.read();
    if (dataInput !== null) {
        const command = dataInput.trim();
        if (command === "itemsList") {
            const itemsList = process.argv[2];
            let fileContent = fs.readFileSync(itemsList, 'utf-8');
            const json = JSON.parse(fileContent);
            console.log(json.itemsList);
        } else if (command === "stop") {
            console.log('Shutting down the server...');
            process.exit(0);
        } else {
            console.log(`Invalid command: ${command}`);
        }
        process.stdout.write(prompt);
        process.stdin.resume();
    }
});
