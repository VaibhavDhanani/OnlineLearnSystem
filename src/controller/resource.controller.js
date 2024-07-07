import { Resource } from "../models/resource.model.js"

const getResources = async (req,res) => {
    try {
        const resources = await Resource.find()
        res.status(200).json(resources)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const insertResource = async (req,res) => {
    const resource = new Resource({
        lesson : req.body.lesson,
        title : req.body.title,
        videolink : req.body.videolink,
    })

    try {
        const savedResource = await resource.save()
        res.status(201).json(savedResource)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const updateResource = async (req,res) => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        res.status(200).json(updatedResource)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const deleteResource = async (req,res) => {
    try {
        const deletedResource = await Resource.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedResource)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export {getResources, insertResource, deleteResource, updateResource};