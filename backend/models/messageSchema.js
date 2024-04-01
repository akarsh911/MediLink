import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : [3, "First Name must be atleast 3 characters long"]
    },
    lastName : {
        type : String,
        required : true,
        minLength : [3, "Last Name must be atleast 3 characters long"]
    },
    email : {
        type : String,
        required : true,
        validate : [validator.isEmail, "Enter a valid email"]
    },
    phone : {
        type : String,
        required : true,
        minLength : [10, "Phone number must contain 10 numbers"],
        maxLength : [10, "Phone number must contain 10 numbers"]
    },
    message : {
        type : String,
        required : true,
        minLength : [10, "Message must be atleast 10 characters long"]
    }
});

export const Message = mongoose.model("Message", messageSchema);