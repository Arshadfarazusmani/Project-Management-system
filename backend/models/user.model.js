import mongoose, { Schema }  from "mongoose"; 
import jwt from "jsonwebtoken"
import crypto from "crypto"

const UserSchema= new Schema({
    avatar:{
        type:{
            url:String,
            localpath : String
        },
        default:{
            url:`https://placehold.co/200x200`,
            localpath: ""
        }
    },

    username:{
        type: String,
        required: true,
        unique: true ,
        lowercase: true,
        trim : true , 
        index : true 
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim : true , 
        
    },
    fullname:{
        type:String,
        required: true,
        trim: true 
    },
    password:{
        type: String,
        required:[true,"Password required "]

    },
    is_EmailVarified:{
        type: Boolean,
        default: false
    },

    refreshToken:{
        type : String
    },

    forgotPasswordToken: {
        type: String

    },

    forgotPasswordTokenExpiry:{
        type : Date
    },

    emailVarificationToken:{
        type: String
    },

    emailVarificationTokenExpiry:{
        type:Date
    }





},{timestamps:true})

// password Hashing 

UserSchema.pre("save", async function(next){
            if(this.isModified("password")){
                this.password = await bcrypt.hash(this.password, 10);
                return next();
            }
            return next();

           });
//  compare password 
UserSchema.methods.comparePassword = async function(password){
               return await bcrypt.compare(password, this.password);
           };


// Generating Accesss Token 

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            "expiresIn":process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// Generating Accesss Token 

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            "expiresIn":process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// Generating Refresh  Token 

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            "expiresIn":process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

// genating temporary tokens 

UserSchema.methods.genarateTemporaryTokens= function () {

    const unhashedToken= crypto.randomBytes(20).toString("hex")

    const HashedToken = crypto.createHash("sha256").update(unhashedToken).digest("hex")

    const TokenExpiry= Date.now() + (20*60*1000)

    return {unhashedToken,HashedToken,TokenExpiry}
    
}



export const User = mongoose.model("User",UserSchema)
