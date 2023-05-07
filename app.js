import express from "express";
const app = express();
const server = app.listen(3010);
import { Server } from "socket.io";
const io = new Server(server, { cors: { origin: "*" } });
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import fightRouter from "./router/combat.js";
import { comm } from "./controller/communication.js";
const communication = comm(io);
app.use(bodyParser.json());
app.use(cookieParser());
var corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/fight", fightRouter(communication));
app.get("/", function (req, res) {
    const { cookies } = req;
    console.log("Cookies: ", cookies);
    res.send("Fight micro services");
});
app.listen(3002, () => {
    console.log("fight webservice started");
});
