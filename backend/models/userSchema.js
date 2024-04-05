import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        // minLength : [3, "First Name must be atleast 3 characters long"]
    },
    lastName : {
        type : String,
        required : true,
        // minLength : [3, "Last Name must be atleast 3 characters long"]
    },
    email : {
        type : String,
        required : true,
        validate : [validator.isEmail, "Enter a valid email"]
    },
    phone : {
        type : String,
        required : true,
        // minLength : [10, "Phone number must contain 10 numbers"],
        // maxLength : [10, "Phone number must contain 10 numbers"]
    },
    nic : {
        type : String,
        required : true,
        // minLength : [12, "NIC must contain 12 numbers"],
        // maxLength : [12, "NIC must contain 12 numbers"]
    },
    dob : {
        type : Date,
        required : [true , "DOB is required"]
    },
    gender : {
        type : String,
        required : true,
        enum : ["Male", "Female"]
    },
    password : {
        type : String,
        required : true,
        select : false,
        // minLength : [8, "Password must at least contain 8 characters"]
    },
    role : {
        type : String,
        required : true,
        enum : ["Admin", "Doctor","Patient"]
    },
    doctorDepartment : {
        type : String
    },
    docAvatar : {
        public_id : String,
        url : String
    }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password ,10);
});

userSchema.methods.comparePasswords = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn : process.env.JWT_EXPIRES,
    });
};


export const User = mongoose.model("User", userSchema);