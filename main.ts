// <reference path="./typings/tsd.d.ts" />
// <reference path="./game/engine.ts" />

import express = require("express")
import engine = require("./game/engine")
import agar = require("./game/agar")

let application = express()
let port = 3000

application.use(express.static("public"))

application.listen(port)