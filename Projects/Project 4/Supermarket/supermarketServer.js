const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require("path");

const portNumber = 5000;
const httpSuccessStatus = 200;

// sample webserver...
// const webServer = http.createServer((request, response) => {
//     response.writeHead(httpSuccessStatus, {'Content-type': 'text/html'});
//     response.write('<h1>Web Server (NoddeJS Based) Running</h1>');
//     response.end();
// });

// webServer.listen(portNumber);
// console.log(`Web server started and running on http://localhost:${portNumber}`);

process.stdin.setEncoding("utf8"); /* encoding */

if (process.argv.length != 3) { /* checking valid call */
    process.stdout.write(`Usage ${process.argv[1]} targetLanguage`);
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
