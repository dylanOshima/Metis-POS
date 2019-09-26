import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap'
import CourseSelect from '../../CustomInput/CourseSelect';
import { showModal } from '../../../actions/ModalActions';
import { CONFIRM_ALERT } from '../../../constants/ModalTypes';
import { updateCourse, addCourse, deleteCourse } from '../../../actions/CourseActions';

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

class Course extends Component {

  state = {
    course: initialCourse,
    activeCourseIndex: 0,
  };

  onUpdate = item => {
    console.log("Clicked: ", item);
  }

  handleMenuSelect = activeCourseIndex => {
    let course = Object.assign(this.props.courses[activeCourseIndex]);
    this.setState({activeCourseIndex, course});
  }

  // Course Modifiers

  handleCourseChange = event => {
    let course = Object.assign({}, this.state.course, event);
    this.setState({course})
  }

  submitCourse = () => {
    if(this.state.course.new) this.props.addCourse(this.state.course);
    else this.props.updateCourse(this.state.course);
  }

  render() {        
    const { activeCourseIndex } = this.state;
    const { courses, dishes, categories, 
      showModal, deleteCourse
    } = this.props;    

    let selectedCourse = this.state.course;
    // console.log("Course.js: ", selectedCourse);
    return (
      <Row>
        <Col style={{'overflowX':'scroll'}} md={3} xs={8}>
          <ListGroup className="well">

            <h2>Courses</h2>

            {courses.map((course, index) => {
              return (
                <ListGroupItem key={index}>
                  <Button 
                    key={course._id}
                    bsStyle={activeCourseIndex === index ? 'primary' : null}
                    onClick={e => this.handleMenuSelect(index)}>
                      {course.name}
                  </Button>
                  <a
                    style={{'float':'right', 'color':'red'}}
                    onClick={e => showModal(CONFIRM_ALERT, {
                      onConfirm: () => deleteCourse(course._id)}
                  )}>
                    <Glyphicon glyph="trash" />
                  </a>
                </ListGroupItem>)
            })}

            {this.state.course.new ? 
              <ListGroupItem>
                <Button disabled> New Course </Button>
              </ListGroupItem> 
            : null}

            <Button
              style={{'marginTop':'1em'}}
              bsStyle="success"
              onClick={() => this.setState({
                activeCourseIndex: -1,
                course: initialCourse
              })}>
              New
            </Button>
          </ListGroup>
        </Col>
        {selectedCourse
          ? (<CourseSelect 
              course={selectedCourse}
              dishes={dishes}
              categories={categories}
              updateCourse={this.handleCourseChange}
              submitCourse={this.submitCourse}
              showModal={showModal} />)
          : null
        }
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  courses: state.course.courses,
  dishes: state.dish.dishes,
  categories: state.dish.categories,
});

export default connect(mapStateToProps, { 
  showModal,
  updateCourse,
  addCourse,
  deleteCourse
})(Course);