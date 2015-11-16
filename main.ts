// <reference path="./typings/tsd.d.ts" />
// <reference path="./game/engine.ts" />

let express = require("express")
let application = express()
let port = 3000

import engine = require("./game/engine")
import agar = require("./game/agar")


let body = new agar.AgarBody()

application.get("/", (request, response) => {
    response.send(JSON.stringify(body))
})

application.listen(port)