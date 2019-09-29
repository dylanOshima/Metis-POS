import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';

import './CourseView.css';

class CourseView extends Component {

  // selectedCourseIndex - No course selected
  // dishes - Stores a map of dishes and the selected dish index
  //          if a value is -1 then no option is selected for that dish
  state = {
    selectedCourseIndex: -1,
    dishes: [], 
  }

  handleCourseSelect = selectedCourseIndex => {
    const courseDishes = this.props.courses[selectedCourseIndex].dishes;
    let dishes = [];

    for(let i=0;i<courseDishes.length;i++) {
      let optionIndex = courseDishes[i].optional ? -1 : courseDishes[i].defaultIndex;
      dishes.push(optionIndex);
    }

    this.setState({
      selectedCourseIndex,
      dishes,
    });
  }
  
  handleOptionSelect = (optionIndex, dishIndex, optional=false) => {
    let dishes = Object.assign({}, this.state.dishes);
    if(optional && dishes[dishIndex] === optionIndex) {
      dishes[dishIndex] = -1 // No option is selected for this dish
    } else {
      dishes[dishIndex] = optionIndex;
    }
    this.setState({dishes});
  }

  handleSubmit = () => {
    const course = this.props.courses[this.state.selectedCourseIndex];
    let item = {};
    item._id = course._id;
    item.name = course.name;
    item.quantity = 1; // TODO: Create input for this
    item.charge = course.markup;
    item.comments = "Selected: ";

    // Update the total cost based on the dishes selected
    // Updates the comment to identify what was selected
    for(let i=0;i<course.dishes.length;i++) {
      const optionIndex = this.state.dishes[i];
      if(optionIndex >= 0) {
        const option = course.dishes[i].options[optionIndex];
        item.charge += option.cost;
        item.comments += option.name + ", ";
      }
    }
    item.comments += "\n";

    this.props.addToOrder(item);
  }

  render = () => (
    <div className="course-view">
      <Row className="menu">
        {this.props.courses.map((course,index) => (
          <Button
            className="menu-button"
            key={course._id}
            onClick={() => this.handleCourseSelect(index)}>
            {course.name}
          </Button>
        ))}
      </Row>
      <Row>
        {this.state.selectedCourseIndex >= 0 ? (() => {
          const course = this.props.courses[this.state.selectedCourseIndex];

          return (
            <div className="order-course">
              {course.dishes.map((dish, dishIndex) => (
                <div
                  key={dishIndex}
                  className='dish'>
                  <div style={{'marginBottom':'0.5em'}}>
                    {dish.optional ? (<em>optional - </em>) : null}
                    <strong>Dish {dishIndex}:</strong>
                  </div>
                  <Row>
                    {dish.options.map((option, optionIndex) => (
                      <Button
                        block
                        bsSize="sm"
                        bsStyle={optionIndex === this.state.dishes[dishIndex]
                          ? 'success'
                          : 'default'
                        }
                        key={option._id}
                        onClick={() => this.handleOptionSelect(optionIndex, dishIndex, dish.optional)}>
                        {option.name} - {option.cost}
                      </Button>
                    ))}
                  </Row>
                </div>
              ))}
              <Button
                bsStyle='success'
                onClick={this.handleSubmit}>
                Add
              </Button>
            </div>
          )
        })() : null}
      </Row>
    </div>
  )
}

export default CourseView;