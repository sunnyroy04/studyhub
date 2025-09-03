const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateAdmin } = require('../controllers/adminController');

router.post('/create', authenticateAdmin, courseController.createCourse);
router.delete('/:id/delete', authenticateAdmin, courseController.deleteCourse);
router.get('/:id', courseController.getCourse);

module.exports = router;
