import React from 'react';
import { Button } from 'react-bootstrap';

const CourseInfo = (props) => {
  const { course, buttonFunc } = props;

  return (
    <div className="well">
      <h4>Cost: {course.cost}</h4>
      <h4>Markup: {course.markup}</h4>
      <h3><strong>Retail Price:</strong> {course.retailPrice}</h3>
      <br />
      <Button
        bsStyle='success'
        onClick={buttonFunc}>
        Update
      </Button>
    </div>
  )
}

export default CourseInfo;