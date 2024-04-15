const http = require('http');
const fs = require('fs');
const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const { name } = require('ejs');
const app = express();

const portNumber = 5000;
const httpSuccessStatus = 200;

//creation of my class order
class Order {
    #orderTotal;

    constructor() {
        this.#orderTotal = 0;
    }

    addToTotal(cost) {
        this.#orderTotal += cost;
    }  

    removeFromTotal(cost) {
        this.#orderTotal -= cost;
    }

    get orderTotal() {
        return this.#orderTotal;
    }
}

/* directory where templates will reside */
app.set("views", path.resolve(__dirname, "templates"));

/* view/templating engine */
app.set("view engine", "ejs");

/* Initializes request.body with post information */ 
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", (request, response) => { 
    response.render("index");
});

app.get("/catalog", (request, response) => {
    const itemsList = process.argv[2];
    let fileContent = fs.readFileSync(itemsList, 'utf-8');
    const json = JSON.parse(fileContent);
    let output = "<table border='1'>";
    output += "<tr><th>Item</th><th>Cost</th></tr>"
    json.itemsList.forEach(item => {
        let {name, cost} = item;
        output += `<tr><td>${name}</td><td>${cost.toFixed(2)}</td></tr>`;
    });
    output += "</table>";
    const variables = { itemsTable: output };
    response.render("displayItems", variables);
});

app.get("/order", (request, response) => {
    const itemsList = process.argv[2];
    let fileContent = fs.readFileSync(itemsList, 'utf-8');
    const json = JSON.parse(fileContent);
    let output = "";
    json.itemsList.forEach(item => {
        let { name } = item;
        output += `<option value='${name}'>${name}</option>`;
    });
    const variables = { items: output };
    response.render("placeOrder", variables);
});

app.post("/order", (request, response) => {
    const newOrder = new Order();
    const itemsList = process.argv[2];
    let fileContent = fs.readFileSync(itemsList, 'utf-8');
    const json = JSON.parse(fileContent);
    let output = "<table border='1'>";
    output += "<tr><th>Item</th><th>Cost</th></tr>"
    request.body.itemsSelected.forEach(currItem => {
        let itemJson = json.itemsList.find(item => item.name === currItem);
        output += `<tr><td>${currItem}</td><td>${itemJson.cost.toFixed(2)}</td></tr>`;
        newOrder.addToTotal(itemJson.cost);
    });
    output += `<tr><td>Total Cost:</td><td>${newOrder.orderTotal.toFixed(2)}</td></tr>`;
    output += "</table><br>";
    const variables = { name: request.body.name,
                        email: request.body.email, 
                        delivery: request.body.delivery, 
                        orderTable: output};
    response.render("orderConfirmation", variables);
});

app.listen(portNumber);
console.log(`Web server started and running at http://localhost:${portNumber}`);

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
