const express = require('express')
const app = express()
//middleware
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const cors = require("cors")
//router
const fight = require('./router/fight')

app.use(bodyParser.json());
app.use(cookieParser());

var corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/fight', fight)

app.get('/', function (req, res) {
    res.send('Fight micro services')
})

app.listen(3002, () => {
    console.log("app started");
})