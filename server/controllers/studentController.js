const Student = require("../models/Student");

const createStudent = async (req, res) => {
    try {
        const { name, email, studentId, course } = req.body;

        const student = await Student.create({
            name,
            email,
            studentId,
            course
        });

        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.json({
            success: true,
            students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createStudent,
    getStudents
};
