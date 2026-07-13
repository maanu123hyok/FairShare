const express=require("express");
const Routes=express.Router();

const {getGroups,createGroup,getGroup,updateGroup,deleteGroup,addMembers,removeMembers}=require("../controllers/groups");

Routes.route("/").get(getGroups).post(createGroup);
Routes.route("/:id").get(getGroup).patch(updateGroup).delete(deleteGroup);
Routes.route("/:id/members/add").patch(addMembers);
Routes.route("/:id/members/remove").patch(removeMembers);

module.exports=Routes;