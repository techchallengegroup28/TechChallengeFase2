var express = require("express");
var router = express.Router();
const sequelize = require("../database/database");
const indexController = require("../controller/indexController");
const Post = require('../model/Post');

/* GET home page. */
router.get("/", indexController.main);

module.exports = router;
