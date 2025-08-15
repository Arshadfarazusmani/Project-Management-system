import mongoose, { Schema }  from "mongoose"; 

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







export const User = mongoose.model("User",UserSchema)
