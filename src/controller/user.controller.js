import { User } from "../models/user.model.js";

const insertUser = async (req,res) => {
    const user = new User({
        username : req.body.username,
        email : req.body.email,
        password :  req.body.password,
        gender : req.body.gender
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const deleteUser = async (req,res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const updateUser = async (req,res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const getUser = async (req,res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export {
    insertUser,
    deleteUser,
    updateUser,
    getUser,
}