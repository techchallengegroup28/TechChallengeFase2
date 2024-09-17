var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');

var indexRouter = require("./routes/index");
var postsRouter = require("./routes/posts");
var authRouter = require("./routes/auth");

var swaggerUi = require("swagger-ui-express");
var swaggerSpecs = require("./swaggerConfig");

var app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true, 
  }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

module.exports = app;
