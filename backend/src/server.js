import express from "express";
import bodyParser from "body-parser";
import upload from "./middlewares/upload.js";
import excelController from "./controllers/coinData/excel.controller.js";
import coindata from "./models/getCoinData.js";
import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

global.__basedir = process.cwd() + "/..";

let __dirname = process.cwd();
let port = 8080;

app.use(bodyParser.urlencoded({ extended: true }), cors(corsOptions));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});
app.get("/portfolio", (req, res) => {
  coindata(req, res);
});
app.post("/upload", upload.single("file"), excelController.upload);
app.listen(port, () => {
  console.log(`running at localhost:${port}`);
});
