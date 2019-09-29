import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { 
  Button, Row, Table, Glyphicon, FormGroup, Radio, HelpBlock, 
  FormControl, Col, Checkbox 
} from 'react-bootstrap';

import { PICK_DISH, CONFIRM_ALERT } from '../../../constants/ModalTypes';
import CourseInfo from './CourseInfo';
import './CourseSelect.css';

class CourseSelect extends Component {

    static propTypes = {
      course: PropTypes.object,
      dishes: PropTypes.array,
      updateCourse: PropTypes.func,
      submitCourse: PropTypes.func,
    }
    
    addDish = (e) => {
      let dish = {
        courseName: "New Course",
        options: []
      };
      let dishes = [...this.props.course.dishes, dish];
      this.props.updateCourse({dishes});
    }

    removeDish = index => {
      let dishes = [...this.props.course.dishes];
      dishes = dishes.slice(0,index).concat(dishes.slice(index+1));
      this.props.updateCourse({dishes})
    }

    changeDefault = (payload) => {
      const { dishIndex, optionIndex } = payload;
      let dishes = this.props.course.dishes;
      dishes[dishIndex].defaultIndex = optionIndex;
      this.props.updateCourse({ dishes })
    }

    changeOptional = (e, index) => {
      let dishes = this.props.course.dishes;
      dishes[index].optional = e.target.checked;
      this.props.updateCourse({ dishes })
    }

    handleInput = (e, type) => {
      let val = e.target.value;
      this.props.updateCourse({
        [type]: val
      })
    }

    addOption = (index, item) => {
      let dishes = [...this.props.course.dishes];
      let options = dishes[index].options;
      let dish = {
        _id: item._id,
        name: item.name,
        cost: item.cost
      };
      if(options.findIndex(option => option._id === dish._id) >= 0) return;
      options.push(dish);
      if(!dishes[index].defaultIndex) dishes[index].defaultIndex = 0;
      this.props.updateCourse({dishes});
    }

    removeOption = (index, optionIndex) => {
      let dishes = [...this.props.course.dishes];
      let options = dishes[index].options;
      let defaultIndex = options.defaultIndex
      dishes[index].options = options.slice(0,optionIndex).concat(options.slice(optionIndex+1));
      if(defaultIndex && (defaultIndex === optionIndex))
        dishes[index].defaultIndex = defaultIndex - 1;
      this.props.updateCourse({dishes});
    }

    // Calls renderButtons to prcess items to be displayed
    render () {
      let { course, submitCourse, showModal } = this.props;

      return(<Fragment>
          <Col md={6} xs={10}>
          <div className="well course-select">
            <form>
              <FormGroup>
                {course._id?
                  (<HelpBlock style={{'float':'right', 'fontSize':'0.8em', 'color':'#5d6368'}}>
                    <i>lastUpdated: {(new Date(course.updatedAt)).toLocaleString()}</i>
                  </HelpBlock>)
                :null}
                <FormControl
                  type="text"
                  id="name"
                  value={course.name}
                  onChange={e => this.handleInput(e, 'name')}
                />
              </FormGroup>
            </form>
            <Row>
              {course.dishes.map((dish, index) => {
                  return (
                    <Table condensed responsive key={index}>
                      <thead>
                        <tr>
                          <td colSpan={3}>
                            Dish {index + 1}
                          </td>
                          <td> 
                            <Checkbox 
                              checked={dish.optional}
                              onChange={e => this.changeOptional(e, index)}
                              inline>
                                Optional
                            </Checkbox>
                          </td>
                          <td style={{'textAlign':'right'}}>
                            <a onClick={e => showModal(CONFIRM_ALERT, {
                                onConfirm: () => this.removeDish(index),
                            })}>
                              <Glyphicon glyph="trash" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>default</th>
                          <th>dish name</th>
                          <th>cost</th>
                          <th>info</th>
                          <th>delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Renders each part of the course  */}
                        {dish.options.map((option, optionIndex) => {
                            return (
                              <tr key={option.name}>
                                <td>
                                  <Radio 
                                    name={"radio-default-"+index}
                                    bsClass="radio-default"
                                    checked={optionIndex === dish.defaultIndex}
                                    onChange={e => this.changeDefault({ 
                                      optionIndex,
                                      dishIndex: index,
                                    })}
                                    inline />
                                </td>
                                <td>
                                  {option.name}
                                  {/* <Autosuggest
                                      suggestions={this.state.filteredSuggestions}
                                      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                      onSuggestionSelected={this.onSuggestionSelected}
                                      getSuggestionValue={this.getSuggestionValue}
                                      renderSuggestion={this.renderSuggestion}
                                      inputProps={{
                                        type: 'input',
                                        placeholder: 'Enter a category',
                                        value: this.props.value,
                                        onChange: event => this.props.changeHandler(event,"category")
                                    }} />
                                  */}
                                </td>
                                <td>{option.cost}</td>
                                <td>
                                  <a onClick={e => console.log("Open dish modal")}>
                                    <Glyphicon glyph="question-sign" />
                                  </a>
                                </td>
                                <td>
                                  <a onClick={e => this.removeOption(index, optionIndex)}>
                                    <Glyphicon glyph="remove" />
                                  </a>
                                </td>
                              </tr>
                            )
                        })}
                        <tr>
                          <td colSpan={5}>
                            <Button
                              block
                              bsSize="small"
                              onClick={() => this.props.showModal(PICK_DISH, {
                                categories: this.props.categories,
                                items: this.props.dishes,
                                submit: this.addOption.bind(this, index),
                              })}>
                              <Glyphicon glyph="plus" /> Add Item
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  )})
              }
              <Table>
                <tbody>
                  <tr>
                    <td colSpan={5}>
                      <Button
                        block
                        style={{'marginRight': '0.5em'}}
                        bsStyle='info'
                        bsSize="sm"
                        name="add-dish"
                        onClick={e => this.addDish(e)}>
                          Add new dish
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
         </div>
        </Col>
        {/* Costings and overview of  */}
        <Col md={3} xs={5}>
            <CourseInfo 
              course={this.props.course}
              buttonFunc={submitCourse} />
        </Col>
        </Fragment>
      )
    }
};

export default CourseSelect;