import { Class } from "../models/class.model.js";


const usedCodes = new Set();

function generateRandomCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function getUniqueCode() {
  let code;
  do {
    code = generateRandomCode();
  } while (usedCodes.has(code));
  
  usedCodes.add(code);
  return code;
}

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
    try {
        const newClass = new Class({
            teacher: req.body.userId,
            subject: req.body.subject,
            code: getUniqueCode()
        });
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

export { getClasses, insertClass, updateClass, deleteClass };
