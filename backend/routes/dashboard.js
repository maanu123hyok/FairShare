const express=require("express");
const Router=express.Router();

const {dashboardInfo}=require("../controllers/dashboard");

Router.route("/").get(dashboardInfo);
module.exports=Router;