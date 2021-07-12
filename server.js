const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = new express();
const fs = require('fs');
var https = require('http');
//const server = require('http').createServer(app);
// const { ServerIo } = require('socket.io');
// const io = new Server(Server);
var server = https.createServer(app);
var io = require('socket.io').listen(server);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(cookieparser());
app.use(logger("dev"));
const dbConfig = require("./config/secret");

app.use((req, res, next) => {
  var url = req.url;
	if (url === "/") {
// fs.readFile looks for the html file
// the first parameter is the path to the html page
// the second is the call back function
// if no file is found the function gives an err
// if the file is successfully found, the content of the file are contained in pgres
		fs.readFile("Index.html", function (err, pgres) {
			if (err)
				res.write("Index.HTML NOT FOUND");
			else {
				// The following 3 lines
				// are responsible for sending the html file
				// and ends the response process
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.write(pgres);
				res.end();
			}
		});
	}
  else
  {
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
  }
});

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//for socket connection
require('./socket/streams')(io);
//

// For authentication
const auth = require("./routes/authRoute");
app.use("/api/chatapp", auth);

// For Posting
const posts = require("./routes/postRoute");
app.use("/api/chatapp", posts);

// For Users
const users = require("./routes/userRoute");
app.use("/api/chatapp", users);

// For Friends
const friends = require("./routes/friendRoute");
app.use("/api/chatapp", friends);

server.listen(process.env.PORT || 3000, () => {
  console.log("Listining on port 3000");
});
