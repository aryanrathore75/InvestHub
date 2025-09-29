require("dotenv").config();
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

// CORS setup
app.use(
  cors({
    origin: ["https://zerodha-webpage-3.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);

// API routes
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
  await newOrder.save();
  res.send(newOrder);
});

app.get("/newOrder", async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

// ----------------- Static Files

// Dashboard static
app.use(
  "/dashboard",
  express.static(path.join(__dirname, "public/dashboard-dist"))
);

// Frontend static
app.use("/", express.static(path.join(__dirname, "public/frontend-dist")));

// Dashboard fallback
app.get("/dashboard/*", (req, res, next) => {
  if (req.path.startsWith("/dashboard/assets/")) {
    return next();
  }
  res.sendFile(path.join(__dirname, "public/dashboard-dist", "index.html"));
});

// Frontend fallback

app.get("/*", (req, res, next) => {
  if (req.path.startsWith("/assets/")) {
    return next();
  }
  res.sendFile(path.join(__dirname, "public/frontend-dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
  mongoose.connect(URL);
  console.log("DB connected");
});
