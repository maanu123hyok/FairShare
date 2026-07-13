const express=require("express");
const Routes=express.Router({mergeParams:true});

const {createExpense,updateExpense,deleteExpense,getAllExpensesInGroup,getExpense}=require("../controllers/expense");

Routes.route("/").get(getAllExpensesInGroup).post(createExpense);
Routes.route("/:expenseId").get(getExpense).patch(updateExpense).delete(deleteExpense);
module.exports=Routes;