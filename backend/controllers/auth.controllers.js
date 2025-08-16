import { User } from "../models/user.model.js";
import { api_error } from "../utils/api_error.js";
import { api_response } from "../utils/api_response.js";
import { async_handler } from "../utils/async_handler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { emailverificationmailgencontent, sendmail } from "../utils/mail.js";

const generateAccessTokenandRefreshToken = async(user_id)=>{
    console.log("Atempting to generate AccessToken and Refresh tokens for user_id:",user_id);

   try {
    const user =  await User.findById(user_id) // fetch the user 
 //    check for user 
 
 if(!user){
     console.error("Error, user not found with this ID ",user_id);
     throw new api_error(401,"user not found for token generation ")
     
 }
 // log  the user details 
  console.log("User found:", user.username, user.email);
 
  const AccessToken= user.generateAccessToken();
  const refreshToken= user.generateRefreshToken();
 
  user.refreshToken = refreshToken;
 
  await user.save({validateBeforeSave:false});
 
  return {AccessToken,refreshToken}
     
   } catch (error) {
    throw new api_error(500,"token generation faild !!!")
    
   }

}

const RegisterUser=async_handler(async(req , res )=>{

    // get user data from frontend 
    const {username,fullname,email,password}=req.body

    // check for the data 
    if(!username|| !password|| !email || !fullname){
        throw new api_error(400,"Please fill All the fields ")
        
    } 

    // check in db  if the user is already exists 

   const existedUser =  await User.findOne({$or:[{username},{email}]});

   if (existedUser) {
    throw new api_error(409,"User Already exists",[])
   }

//    check for avatar 

const avatarlocalpath =  req.files?.avatar[0]?.path;  
console.log(avatarlocalpath);


let avatar ;



if(avatarlocalpath){

    avatar= await uploadOnCloudinary(avatarlocalpath);
    
}

const user=await User.create({  // this will create a new object in db 
    username: username.toLowerCase(),
    email,
    fullname,
    password,
    is_EmailVarified: false,
    avatar: avatar.url || "https://placehold.co/200x200"
    
});

 const {unhashedToken,HashedToken,TokenExpiry}= user.genarateTemporaryTokens()

 user.emailVarificationToken=HashedToken;

 user.emailVarificationTokenExpiry= TokenExpiry;

 user.save({validateBeforeSave:false})

//  await sendmail({
//     email:user?.email,
//     subject: "Please verify your Email !!",
//     mailgencontent:emailverificationmailgencontent(
//         user?.username,
//          `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`
//     )
//  })

 const createdUser= await User.findById(user._id).select("-password  -refreshToken -emailVarificationToken -emailVarificationTokenExpiry")

 if(!createdUser){
    throw new api_error(401,"An Error occured while registring the user ")

 }

 res.status(201).json(new api_response(200,"User created successfully",createdUser));
 console.log("User created ");
 
})





export{RegisterUser}