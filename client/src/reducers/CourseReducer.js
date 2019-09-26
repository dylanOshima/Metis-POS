import {
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  LOAD_COURSES,
  UPDATE_COURSE,
  DELETE_COURSE,
  UPDATE_ACTIVE_COURSE,
  RESET_ACTIVE_COURSE,
} from '../constants/ActionTypes';

// Courses
const defaultCourseDish = {
  courseName: 'Course',
  defaultIndex: 0,
  optional: false,
  options: []
}

const initialCourse = {
  new: true,
  name: "New Course",
  dishes: [defaultCourseDish],
  cost: 0,
  markup: 0,
  retailPrice: 0
} 

const initialState = {
  isFetching: false,
  courses: [],
  activeCourse: initialCourse,
  error: null,
}

export default function courseReducer(state=initialState, action) {
  switch(action.type) {
    case ADD_COURSE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case ADD_COURSE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        courses: [...state.courses, action.newCourse],
        activeCourse: action.newCourse,
      });
    case ADD_COURSE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case LOAD_COURSES:
      return Object.assign({}, state, {
        courses: action.courses
      });
    case UPDATE_COURSE:
      return Object.assign({}, state, {
        courses: state.courses.map(course => {
          if(course._id === action.course._id){
            return action.course;
          } else return course;
        }),
        activeCourse: action.course
      });
    case DELETE_COURSE:
      return Object.assign({}, state, {
        courses: state.courses.filter(course => {
          return course._id !== action.courseId
        })
      });
    case UPDATE_ACTIVE_COURSE:
      return Object.assign({}, state, {
        activeCourse: Object.assign({}, state.activeCourse, action.course)
      });
    case RESET_ACTIVE_COURSE:
      return Object.assign({}, state, {
        activeCourse: initialCourse
      });
    default:
      return state;
  }
}