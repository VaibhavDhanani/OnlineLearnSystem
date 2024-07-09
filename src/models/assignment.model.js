import mongoose,{Schema} from "mongoose";

const assignmentSchema = new Schema({
    title: {
        type: String, 
        required : true
    },
    description :{
        type: String,
        required : true
    },
    dueDate: {
        type: Date, 
        required : true
    },
    class: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Class'
    },
    files: [{
        type: String,
    }],
})

export const Assignment = mongoose.model('Assignment', assignmentSchema);