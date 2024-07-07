import { Class } from "../models/class.model.js"
import { Material } from "../models/material.model.js"

const getMaterial = async (req,res) => {
    try {
        const materials = await Material.find()
        res.status(200).json(materials)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const insertMaterial = async (req,res) => {
    const material = new Material({
        title : req.body.title,
        class : req.body.class,
        file : req.body.file,
    })
    
    try {
        const newMaterial = await material.save()
        const updateClass = await Class.findById(req.body.class)
        updateClass.materials.push(newMaterial._id)
        await updateClass.save()
        res.status(201).json(newMaterial)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const updateMaterial = async (req,res) => {
    try {
        const newMaterial = await Material.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        res.status(200).json(newMaterial)
    } catch (error) {
        res.status(401).json({
            success : false, 
            message : error.message
        })
    }
}

const deleteMaterial = async (req,res) => {
    try {
        const deletedMaterial = await Material.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedMaterial)
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export  {getMaterial, insertMaterial, updateMaterial, deleteMaterial};