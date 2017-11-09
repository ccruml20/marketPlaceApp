"use strict"
var mongoose = require('mongoose');

//creat mongo schema
var projectsSchema = mongoose.Schema({
  title: String,
  description: String,
  images: String,
  price: Number
});

var Projects = mongoose.model("Projects", projectsSchema);
module.exports = Projects;
