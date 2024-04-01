import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    nic : {
        type : String,
        required : true,
        minLength : [12, "NIC must contain 12 numbers"],
        maxLength : [12, "NIC must contain 12 numbers"]
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
    appointment_date : {
        type : Date,
        required : true 
    },
    department : {
        type : String,
        required : true 
    },
    doctor : {
        firstName : {
            type : String,
            required : true 
        },
        lastName : {
            type : String,
            required : true 
        }
    },
    hasVisited : {
        type : Boolean,
        default : false 
    },
    doctorId : {
        type : mongoose.Schema.ObjectId,
        required : true 
    },
    patientId : {
        type : mongoose.Schema.ObjectId,
        required : true 
    },
    address : {
        type : String,
        required : true 
    },
    status : {
        type : String,
        enum : ["Pending","Accepted","Rejected"] ,
        default : "Pending"
    }
});

export const Appointment = mongoose.model("Appointment",appointmentSchema);