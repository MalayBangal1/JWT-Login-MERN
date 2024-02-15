const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keySecret = "dsmkkckscmdskkdsmdskdcmdksdkcmkds";

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not valid Email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    cpassword:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

});

userSchema.pre("save", async function(next){

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
        this.cpassword = await bcrypt.hash(this.cpassword,10);
    }
        next();
});

userSchema.methods.generateAuthtoken = async function(){
    try {
        let token23 = jwt.sign({_id:this._id},keySecret,{
            expiresIn:"1d"
        });
        this.tokens = this.tokens.concat({token:token23});
        await this.save();
        return token23;
    } catch (error) {
        console.log(error);
    }
}

const Userdb = new mongoose.model('user',userSchema);

module.exports = Userdb;
