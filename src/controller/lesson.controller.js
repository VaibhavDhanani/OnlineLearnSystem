import { Class } from "../models/class.model.js"
import { Lesson } from "../models/lesson.model.js"

const getLessons = async (req,res) => {
    try {
        const lessons = await Lesson.find()
        res.status(200).json(lessons)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const insertLesson = async (req,res) => {
    const lesson = new Lesson({
        class : req.body.class,
        title : req.body.title,
        content : req.body.content,
    })
    
    try {
        const newLesson = await lesson.save()
        const updateClass = await Class.findById(req.body.class)
        updateClass.lessons.push(newLesson._id)
        await updateClass.save()
        res.status(201).json(newLesson)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const updateLesson = async (req,res) => {
    try {
        const newLesson = await Lesson.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        res.status(200).json(newLesson)
    } catch (error) {
        res.status(401).json({
            success : false, 
            message : error.message
        })
    }
}

const deleteLesson = async (req,res) => {
    try {
        const deletedLesson = await Lesson.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedLesson)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export  {getLessons, insertLesson, updateLesson, deleteLesson};