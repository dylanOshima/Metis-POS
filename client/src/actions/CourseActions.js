import { courseCalls as api } from '../utils/API_Ref'; 
import {
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  LOAD_COURSES,
  UPDATE_COURSE,
  DELETE_COURSE
} from '../constants/ActionTypes';

export function addCourse(course) {
  return function(dispatch) {
    dispatch({ type: ADD_COURSE_REQUEST });

    let newCourse = Object.assign({}, course, {
        cost: parseInt(course.cost,10),
        markup: parseInt(course.markup,10)
    });

    return api.postCourse(newCourse)
      .then(request => {
        dispatch({
          type: ADD_COURSE_SUCCESS,
          newCourse: request.data
        })
      }).catch(error => {
        dispatch({
          type: ADD_COURSE_FAILURE,
          error
        })
      }) 
  }
}

export function loadCourses() {
  return dispatch => {
    return api.getCourses().then(response => {
        dispatch({
          type: LOAD_COURSES,
          courses: response.data,
        })
      }).catch(error => {
        // throw error
        console.error("problem loading courses: ", error)
    })
  }
}

export function updateCourse(course) {
  return dispatch => {
    return api.postCourse(course).then(response => {
        dispatch({
          type: UPDATE_COURSE,
          course: response.data,
        })
      }).catch(error => {
        // throw error
        console.error("problem updating course: ", error)
    })
  }
}

export function deleteCourse(courseId) {
  return dispatch => {
    return api.deleteCourse(courseId).then(() => {
        dispatch({
          type: DELETE_COURSE,
          courseId: courseId,
        })
      }).catch(error => {
        // throw error
        console.error("problem deleting course: ", error)
    })
  }
}