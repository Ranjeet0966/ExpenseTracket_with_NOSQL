const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
const signUpRouter = require("./routes/sign-up");
const logInRouter = require("./routes/login");
const expenseRouter = require("./routes/expense");
const purchaseRouter = require("./routes/purchase");
const premiumRouter = require("./routes/premium");
const forgotPasswordRouter = require("./routes/password");

const User = require("./models/user");
const Expenses = require("./models/expense");
const Order = require("./models/orders");
const ForgotPasswordRequests = require("./models/forgotpassword");
const FileURL = require("./models/fileurl");

//const helmet = require("helmet");
//const morgan = require("morgan");

app.use(cors());
// app.use(helmet());
// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "access.log"),
//   { flags: "a" }
// );
// app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json({ extended: false }));

app.use("/user", signUpRouter);
app.use("/user", logInRouter);
app.use("/user", expenseRouter);
app.use("/purchase", purchaseRouter);
app.use("/premium", premiumRouter);
app.use("/password", forgotPasswordRouter);

app.use((req, res) => {
  console.log("urlll", req.url);
  res.sendFile(path.join(__dirname, `public/${req.url}`));
});

// User.hasMany(Expenses);
// Expenses.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

// User.hasMany(ForgotPasswordRequests);
// ForgotPasswordRequests.belongsTo(User);

// User.hasMany(FileURL);
// FileURL.belongsTo(User);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@atlascluster.sw1lvwy.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=AtlasCluster`
  )
  .then(() => {
    app.listen( 4000);
  })
  .catch((err) => console.log(err));
