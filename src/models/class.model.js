import mongoose,{Schema} from "mongoose";

const classSchema = new Schema({
    teacher: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },      
    subject : {
        type : String,
        required : true,
        unique : true,
        trim: true,
    },
    students :[{
        type : Schema.Types.ObjectId,
        ref: 'User'
    }],
    lessons :[{
        type : Schema.Types.ObjectId,
        ref: 'Lesson'
    }],
    materials :[{
        type : Schema.Types.ObjectId,
        ref: 'Material'
    }],
},{timestamps: true},)

export const Class = mongoose.model('Class',classSchema);

// {
//     "_id": "6689227f2e60f9eb379b43ef",
//     "teacher": "668918a2897173eaf4dd2a4d",
//     "subject": "Java",
//     "students": [
//         "668918a2897173eaf4dd2a4e",
//         "668918a2897173eaf4dd2a4f"
//     ],
//     "lessons": [
//         "668918a2897173eaf4dd2a50",
//         "668918a2897173eaf4dd2a51"
//     ],
//     "materials": [
//         "668918a2897173eaf4dd2a52",
//         "668918a2897173eaf4dd2a53"
//     ],
//     
// }