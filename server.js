const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = new express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(cookieparser());
app.use(logger("dev"));
const dbConfig = require("./config/secret");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "DELETE",
    "PUT",
    "OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-width, Content-Type, Accept, Authorization"
  );
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const auth = require("./routes/authRoute");
app.use("/api/chatapp", auth);

app.listen(process.env.PORT || 3000, () => {
  console.log("Listining on port 3000");
});
