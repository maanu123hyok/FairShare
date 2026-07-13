const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  expName: {
    type: String,
    minlength: [2, "Please provide atleast 2 characters"],
    maxlength: [50, "Please provide maximum of 50 characters"],
    required: [true, "Please provide the expense name"],
  },

  expDescription: {
    type: String,
    minlength: [7, "Please provide atleast 7 characters"],
    maxlength: [70, "Please provide maximum of 70 characters"],
    required: [true, "Please provide the expense name"],
  },

  amtPaid:{
    type:Number,
    required:[true, "please provide the expense amount to be paid"]
  },
  
  whoPaid:{
    type:mongoose.Types.ObjectId,
    ref:"user",
    required:[true, "please provide the id of the one who needs to pay"]
  },

  forWhomPaid: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: [true, "please provide the id of the one who needs to pay"],
  },
  
  amtReturned: {
    type: Number,
    default:0,
  },

  totalAmtDue: {
    type: Number,
  },
  groupId:{
    type:mongoose.Types.ObjectId,
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"user",
    required:[true,"Please provide the creator of the expense"],
  }

},{timestamps:true});

expenseSchema.pre("save",function(){
  this.totalAmtDue=this.amtPaid-this.amtReturned;
})

module.exports=mongoose.model("expense", expenseSchema);
