const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = new express();
const fs = require('fs');
var https = require('http');
const _ = require('lodash');
;
var server = https.createServer(app);
var io = require('socket.io').listen(server);


const { User } = require('./Helpers/UserClass');
//for socket connection
require('./socket/streams')(io,User,_);
//require('./socket/private')(io);
//

const dbConfig = require("./config/secret");
const auth = require("./routes/authRoute");
const posts = require("./routes/postRoute");
const users = require("./routes/userRoute");
const friends = require("./routes/friendRoute");
const message = require("./routes/messageRoute");


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(cookieparser());
app.use(logger("dev"));


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



// For authentication

app.use("/api/chatapp", auth);

// For Posting

app.use("/api/chatapp", posts);

// For Users

app.use("/api/chatapp", users);

// For Friends

app.use("/api/chatapp", friends);

// For Message 

app.use("/api/chatapp", message);

server.listen(process.env.PORT || 3000, () => {
  console.log("Listining on port 3000");
});
