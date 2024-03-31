import {catchAsyncErrors} from "../middleware/cathAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import {User} from "../models/userSchema.js";
import {genrateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async(req,res,next) => {
    const { firstName, lastName, phone, email, nic, role, dob, password, gender} = req.body;

    if(!firstName || !lastName || !phone || !email || !nic || !role || !dob || !password || !gender){
        return next(new ErrorHandler("Please fill all details in the form",400));
    }
    const isRegistered = await  User.findOne({email : email });
    if(isRegistered)
    {
        return next(new ErrorHandler(`${isRegistered.role} with same email already exists`,400));
    }
    const user = await User.create({firstName, lastName, phone, email, nic, role, dob, password, gender});
   
    genrateToken(user, "User Registered",200, res);
   
});

export const login = catchAsyncErrors(async(req,res,next) => {
    const {email, password, confirmPassword, role} = req.body;

    if(!email || !password || !confirmPassword || !role)
    {
        return next(new ErrorHandler("Please fill all the details in the form", 400));
    }
    if(password !== confirmPassword)
    {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    const user = await User.findOne({email }).select("+password");
    if(!user)
    {
        return next(new ErrorHandler("Invalid Email or Password",400));
    }
    const isPasswordMatched = await user.comparePasswords(password);
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Invalid Email or Password",400));
    }
    if(role !== user.role)
    {
        return next(new ErrorHandler("User with this role not found",400));
    }
    genrateToken(user, "User Logged In Successfully",200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req,res,next) => {
    const { firstName, lastName, phone, email, nic, dob, password, gender} = req.body;

    if(!firstName || !lastName || !phone || !email || !nic || !dob || !password || !gender){
        return next(new ErrorHandler("Please fill all details in the form",400));
    }

    const isRegistered = await  User.findOne({email : email });
    if(isRegistered)
    {
        return next(new ErrorHandler(`${isRegistered.role} with same email already exists`,400));
    }

    const admin = User.create({firstName, lastName, phone, email, nic, dob, password, gender, role : "Admin"});
    res.status(200).json({
        success : true,
        message : "New Admin registered"
    });
    

});

export const getAllDoctors = catchAsyncErrors(async (req,res,next) => {
    const doctors = await User.find({ role : "Doctor"});
    res.status(200).json({
        success : true,
        doctors
    });
});

export const getUserDetails = catchAsyncErrors(async(req,res,next) => {
    const user = req.user;
    res.status(200).json({
        success : true,
        user
    });
});

export const logoutAdmin = catchAsyncErrors(async(req,res,next) => {
    res.status(200).cookie("adminToken","",{
        httpOnly : true,
        expires : new Date(Date.now()),
   }).json({
    success : true,
    message : "Admin Logged Out Successfully!"
   });
});

export const logoutPatient = catchAsyncErrors(async(req,res,next) => {
    res.status(200).cookie("patientToken","",{
        httpOnly : true,
        expires : new Date(Date.now()),
   }).json({
    success : true,
    message : "Patient Logged Out Successfully!"
   });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      doctorDepartment,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password ||
      !doctorDepartment ||
      !docAvatar
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(
        new ErrorHandler("Doctor With This Email Already Exists!", 400)
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      docAvatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(
        new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
      );
    }
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Doctor",
      doctorDepartment,
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  });