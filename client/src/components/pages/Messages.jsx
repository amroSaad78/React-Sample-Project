import { scrolling } from "../../actions/scrollActions";
import { withRouter } from "../../helper/WithRouter";
import { subCourseListType } from "../../types";
import MessageCard from "../MessageCard";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  reload,
  toggle,
  edit,
  get,
  del,
  onUnmount,
  sendMessage,
  confirmDeletion,
} from "../../actions/messagesActions";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onOpen = this.onOpen.bind(this);
  }

  onDelete({ id }) {
    if (this.props.busy) return;
    this.props.confirmDeletion(() =>
      this.props.del(this.props.list, this.props.skip, id)
    );
  }

  onOpen(payload) {
    if (this.props.busy) return;
    this.props.edit({
      ...payload,
    });
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

  componentDidUpdate() {}

  componentWillUnmount() {
    this.props.onUnmount();
  }
  render() {
    return (
      <div className="cards-container">
        {this.props.list.map((subCourse, index) => (
          <MessageCard
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
    );
  }
}

Messages.propTypes = subCourseListType;

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
})(withRouter(Messages));
