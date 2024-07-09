import { Assignment } from "../models/assignment.model.js";

const insertAssignment = async(req,res) => {
    const assignment = new Assignment({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        class: req.body.class,
        files: req.body.files,
    })

    try {
        const newAssignment = await assignment.save()
        res.status(201).json(newAssignment)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const getAssignments = async(req,res) => {
    try {
        const assignments = await Assignment.find()
        res.status(200).json(assignments)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const deleteAssignment = async(req,res) => {
    try {
        const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedAssignment)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const updateAssignment = async(req,res) => {
    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedAssignment)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export { insertAssignment, getAssignments, deleteAssignment, updateAssignment }