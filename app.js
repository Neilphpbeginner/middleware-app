var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var { checkJWTToken } = require("./routes/middleware");
var logger = require("morgan");

var PORT = 8080 || process.env.PORT;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log("Application up and running on port: " + PORT);
});
