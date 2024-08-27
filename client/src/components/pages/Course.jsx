import { onUnmount } from "../../actions/courseActions";
import { CourseMap } from "../../helper/CourseMap";
import FloatButton from "../FloatButton";
import React, { Component } from "react";
import { courseType } from "../../types";
import { connect } from "react-redux";

class Course extends Component {
  componentWillUnmount() {
    this.props.onUnmount();
  }
  render() {
    return (
      <>
        {CourseMap.get(this.props.state)}
        <FloatButton url="/courses" icon="fas fa-angle-left" />
      </>
    );
  }
}

Course.propTypes = courseType;

const mapState = (state) => ({
  state: state.course.state,
});

export default connect(mapState, { onUnmount })(Course);
