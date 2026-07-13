const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
    required: [true, "Please provide the email"],
    unique: true,
  },
  password: {
    type: String,
    validate: {
      validator: function (val) {
        return /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{7,}$/.test(val);
      },
      message: (prop) => `${prop.value} is not a correct password.`,
    },
    required: true,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.generateToken=function(){
    const email=this.email;
    const name=this.name;
    const id=this._id;
    return jwt.sign({email,name,id},process.env.JWT_SECRET,{
        expiresIn:process.env.EXPIRES_IN
    })
}

userSchema.methods.verifyPassword=async function(userPassword){
   return await bcrypt.compare(userPassword,this.password);
}
module.exports = mongoose.model("user", userSchema);
