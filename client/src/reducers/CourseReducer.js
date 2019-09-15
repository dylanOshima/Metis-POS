import {
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  LOAD_COURSES,
  UPDATE_COURSE,
  DELETE_COURSE
} from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  courses: [],
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
        })
      });
    case DELETE_COURSE:
      return Object.assign({}, state, {
        courses: state.courses.filter(course => {
          return course._id !== action.courseId
        })
      });
    default:
      return state;
  }
}