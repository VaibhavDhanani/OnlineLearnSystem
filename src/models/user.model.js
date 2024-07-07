import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username :{
        type : String,
        required : true,
        unique : true,
        trim: true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
        trim: true,
    },
    password :{
        type : String,
        required : true,
    },
    gender:{
        type: String,
        required : true,
    },
    type: {
        type: String,
        required : true,
        enum : ['student','teacher'],
        default :'student'
    }
},
    {timestamps: true}
);

export const User = mongoose.model('User',userSchema);