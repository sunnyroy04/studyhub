const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    const { title, description, price } = req.body;
    const course = new Course({ title, description, price });
    await course.save();
    res.json({ message: 'Course created', course });
};

exports.deleteCourse = async (req, res) => {
    const id = req.params.id;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
};

exports.getCourse = async (req, res) => {
    const id = req.params.id;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
};
