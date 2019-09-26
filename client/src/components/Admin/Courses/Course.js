import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap'
import CourseSelect from './CourseSelect';
import { showModal } from '../../../actions/ModalActions';
import { CONFIRM_ALERT } from '../../../constants/ModalTypes';
import { updateCourse, addCourse, deleteCourse, updateActiveCourse, resetActiveCourse } from '../../../actions/CourseActions';

class Course extends Component {

  state = {
    activeCourseIndex: 0,
  };

  onUpdate = item => {
    console.log("Clicked: ", item);
  }

  handleMenuSelect = activeCourseIndex => {
    this.setState({activeCourseIndex});
    this.props.updateActiveCourse(this.props.courses[activeCourseIndex]);
  }

  // Course Modifiers

  handleCourseChange = event => {
    // Assumes the event has key,value pairs that correspond 
    // to properties of the course
    this.props.updateActiveCourse(event);
  }

  handleNewCourse = () => {
    this.setState({ activeCourseIndex: -1 });
    this.props.resetActiveCourse();
  }

  submitCourse = () => {
    if(!this.props.course._id) this.props.addCourse(this.props.course);
    else this.props.updateCourse(this.props.course);
  }

  render() {        
    const { activeCourseIndex } = this.state;
    const { course, courses, dishes, categories, 
      showModal, deleteCourse,
    } = this.props;
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

            {!this.props.course._id ? 
              <ListGroupItem>
                <Button disabled> New Course </Button>
              </ListGroupItem> 
            : null}

            <Button
              style={{'marginTop':'1em'}}
              bsStyle="success"
              onClick={this.handleNewCourse}>
              New
            </Button>
            
          </ListGroup>
        </Col>
        {course
          ? (<CourseSelect 
              course={course}
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
  course: state.course.activeCourse,
  dishes: state.dish.dishes,
  categories: state.dish.categories,
});

export default connect(mapStateToProps, { 
  showModal,
  updateCourse, addCourse, deleteCourse,
  updateActiveCourse, resetActiveCourse,
})(Course);