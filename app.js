import express from "express";
const app = express();
//http server
const server = app.listen(3010);
//socket.io
import { Server } from "socket.io";
const io = new Server(server, { cors: { origin: "*" } });
//middleware
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
//router
// const fight = require("./router/real-time-arena");
import fight from "./router/combat.js";

import { comm } from "./controller/communication.js";

const communication = comm(io);

app.use(bodyParser.json());
app.use(cookieParser());

var corsOptions = {
	origin: "*",
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// app.use("/real-time-arena", fight);
app.use("/fight", fight);

app.get("/", function (req, res) {
	const { cookies } = req;
	console.log("Cookies: ", cookies);
	res.send("Fight micro services");
});

app.listen(3002, () => {
	console.log("fight webservice started");
});
