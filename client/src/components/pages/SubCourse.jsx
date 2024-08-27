import { onUnmount, reload } from "../../actions/subCourseActions";
import { SubCourseMap } from "../../helper/SubCourseMap";
import { subCourseType } from "../../types";
import FloatButton from "../FloatButton";
import React, { Component } from "react";
import { connect } from "react-redux";

class SubCourse extends Component {
  componentDidMount() {
    if (!this.props.url) this.props.reload();
  }
  componentWillUnmount() {
    this.props.onUnmount();
  }
  render() {
    return (
      <>
        {SubCourseMap.get(this.props.state)}
        <FloatButton url={this.props.url} icon="fas fa-angle-left" />
      </>
    );
  }
}
SubCourse.propTypes = subCourseType;
const mapState = (state) => ({
  state: state.subCourse.state,
  url: state.subCourse.url,
});

export default connect(mapState, { onUnmount, reload })(SubCourse);
