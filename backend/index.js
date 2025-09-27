require("dotenv").config();

const { config } = require("dotenv");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UsersModel } = require("./model/UsersModel");

const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URL;

const app = express();
//app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);

// Dashboard already served
app.use("/dashboard", express.static(path.join(__dirname, "public/dashboard")));

// Serve frontend
app.use("/", express.static(path.join(__dirname, "public/frontend")));

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/frontend", "index.html"));
});

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  newOrder.save();
  res.send(newOrder);
});

app.get("/newOrder", async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
  mongoose.connect(URL);
  console.log("DB connected");
});
