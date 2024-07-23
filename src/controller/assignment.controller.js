import { Assignment } from "../models/assignment.model.js";
import { Class } from "../models/class.model.js";

const insertAssignment = async (req, res) => {
    try {
        const assignment_class = await Class.findOne({ subject: req.body.subject });
        if (!assignment_class) {
            return res.status(404).json({ success: false, message: "Class not found" });
        }

        // console.log(req.body.files)
        const assignment = new Assignment({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            class: assignment_class._id,
            files: req.body.files,
        });

        const newAssignment = await assignment.save();
        res.status(201).json({ success: true, assignment: newAssignment });
    } catch (error) {
        console.error("Error in insertAssignment:", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getAssignments = async (req, res) => {
    try {
        const subject = await Class.findOne({ subject: req.params.subject });
        
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Class not found for the given subject"
            });
        }
        const assignments = await Assignment.find({ class: subject._id })
            .populate('class', 'subject')
            .sort({ dueDate: 1 }); 
        console.log(`Found ${assignments.length} assignments for subject: ${subject.subject}`);

        res.status(200).json({
            success: true,
            data: assignments
        });
    } catch (error) {
        console.error("Error in getAssignments:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching assignments",
            error: error.message
        });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedAssignment)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const updateAssignment = async (req, res) => {
    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedAssignment)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export { insertAssignment, getAssignments, deleteAssignment, updateAssignment }