// ./controllers/courseController.js

const models 	= require('../models/all-models.js');
const course = models.Course;

// Get all courses
exports.getCourses = async (req,res,next) => {
  try {
    course.find()
      .then(result =>{
          res.json(result);
    })
  } catch(error) {
    next(error);
  }
};

// Get all courses
exports.addCourse = async (req,res,next) => {
  try{
    course.create(req.body)
      .then(result =>{
          res.json(result);
    })
  } catch(error) {
    next(error)
  }
};

// Update course information
exports.updateCourse = async (req, res, next) => {
  try {
    if(!req.params.id) next(new Error("No id given"));
    else course.findById(req.params.id,(err,course)=>{
      if (err) next(err);
      course.name = req.body.name;
      course.dishes = req.body.dishes
      course.cost = req.body.cost;
      course.markup = req.body.markup;
      course.save((err,result)=>{
          if (err) next(err);
          res.send(result);
      });
    })
  } catch(error) {
    next(error);
  }
};

// Delete course based on ID
exports.deleteCourse = async(req,res,next) => {
  try {
    course.remove({_id: req.params.id})
      .then(result => res.json(result))
  } catch(error) {
    next(error)
  }
}

// Query for course based on ID field
exports.getById = async (req, res, next) => {
  try {
    course.findById(req.params.id)
      .then(result => {
          res.json(result)
      })
  } catch(error) {
    next(error);
  }
};