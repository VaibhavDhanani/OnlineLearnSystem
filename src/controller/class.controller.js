import { Class } from "../models/class.model.js";

const getClasses = async (req, res) => {
    try {
      const classCodes = req.body.codes;
      const classes = await Promise.all(classCodes.map(async (code) => {
        const reqClass = await Class.findOne({ code });
        return reqClass;
      }));
    //   console.log(classCodes)
  
      res.status(200).json(classes);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  


const insertClass = async (req, res) => {
    const newClass = new Class({
        teacher: req.body.teacher,
        subject: req.body.subject,
        students: req.body.students,
        lessons: req.body.lessons,
        materials: req.body.materials,
    });
    try {
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json(updatedClass);
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    };
}

const deleteClass = async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedClass);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export {getClasses, insertClass,updateClass,deleteClass};
