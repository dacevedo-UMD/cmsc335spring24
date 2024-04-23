const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const portNumber = process.argv[2];