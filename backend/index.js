require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UsersModel } = require("./model/UsersModel");
const authRoute = require("./Routes/AuthRoute");

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

// ---------------------- Middleware ----------------------
app.use(
  cors({
    origin: ["https://zerodha-webpage-3.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// ---------------------- API Routes ----------------------
app.use("/", authRoute);

app.get("/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  const newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  await newOrder.save();
  res.json(newOrder);
});

app.get("/newOrder", async (req, res) => {
  const allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

// ---------------------- Static Files ----------------------

// ----- Dashboard static -----
app.use(
  "/dashboard/assets",
  express.static(path.join(__dirname, "public/dashboard-dist/assets"))
);
app.use(
  "/dashboard",
  express.static(path.join(__dirname, "public/dashboard-dist"))
);

// Dashboard fallback (React Router)
app.get("/dashboard/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dashboard-dist", "index.html"));
});

// ----- Frontend static -----
app.use(
  "/assets",
  express.static(path.join(__dirname, "public/frontend-dist/assets"))
);
app.use(express.static(path.join(__dirname, "public/frontend-dist")));

// Frontend fallback (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/frontend-dist", "index.html"));
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
});
