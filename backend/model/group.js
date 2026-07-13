const mongoose=require("mongoose");

const groupSchema=new mongoose.Schema({
    "grpName":{
        type:String,
        minlength:[3,"Please provide atleast 3 characters"],
        maxlength:[50,"Please provide atleast 50 characters"],
        required:true,
    },
    "grpDescription":{
        type:String,
        minlength:[15,"Please provide atleast 15 characters"],
        maxlength:[100,"Please provide atleast 100 characters"],
        required:true,
    },
    "grpMembers":{
        type:[mongoose.Types.ObjectId],
        ref:"user",
        validate:{
            validator:function(val){
                return val.length>=2;
            }
        },
        required:[true,"Please provide group member's details"],
    },
    "createdBy":{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:[true,"Please provide with the creator of the group"],
    }
},
{timestamps:true})
module.exports=mongoose.model("group",groupSchema);