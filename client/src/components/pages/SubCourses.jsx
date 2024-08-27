import { scrolling } from "../../actions/scrollActions";
import { withRouter } from "../../helper/WithRouter";
import { subCourseListType } from "../../types";
import SubCourseCard from "../SubCourseCard";
import FloatButton from "../FloatButton";
import React, { Component } from "react";
import { connect } from "react-redux";
import TitleBox from "../TitleBox";
import {
  reload,
  toggle,
  edit,
  get,
  del,
  onUnmount,
  sendMessage,
  confirmDeletion,
} from "../../actions/subCoursesActions";

class SubCourses extends Component {
  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onDelete({ id }) {
    if (this.props.busy) return;
    this.props.confirmDeletion(() =>
      this.props.del(this.props.list, this.props.skip, id)
    );
  }

  onEdit(payload) {
    if (this.props.busy) return;
    this.props.edit({
      ...payload,
      courseId: this.props.courseId,
      name: this.props.name,
    });
  }

  onSend(payload) {
    if (this.props.busy) return;
    this.props.sendMessage({
      ...payload,
      title: this.props.name,
    });
  }

  onToggle({ id, isActive }) {
    if (this.props.busy) return;
    this.props.toggle(this.props.list, id, isActive);
  }

  componentDidMount() {
    if (!this.props.courseId) this.props.reload();
    this.props.scrolling(() =>
      this.props.get(
        this.props.courseId,
        this.props.list,
        this.props.currentPage,
        this.props.nextPage,
        this.props.skip
      )
    );
  }

  componentDidUpdate() {
    let path = this.props.routePath;
    path && this.props.navigate(path);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }
  render() {
    return (
      <>
        <div className="cards-container">
          {this.props.list.map((subCourse, index) => (
            <SubCourseCard
              key={index}
              {...subCourse}
              del={this.onDelete}
              send={this.onSend}
              edit={this.onEdit}
              toggle={this.onToggle}
            />
          ))}
          <div className="dummy" />
        </div>
        <TitleBox title={this.props.name} />
        <FloatButton url="/courses" icon="fas fa-angle-left" />
      </>
    );
  }
}

SubCourses.propTypes = subCourseListType;

const mapState = (state) => ({
  currentPage: state.subCourses.currentPage,
  routePath: state.subCourses.routePath,
  nextPage: state.subCourses.nextPage,
  courseId: state.subCourses.courseId,
  name: state.subCourses.name,
  list: state.subCourses.list,
  skip: state.subCourses.skip,
  busy: state.subCourses.busy,
});

export default connect(mapState, {
  toggle,
  reload,
  edit,
  get,
  del,
  scrolling,
  onUnmount,
  sendMessage,
  confirmDeletion,
})(withRouter(SubCourses));
