import { leazyLoading } from "../../actions/leazyLoadingActions";
import { coursesSearchBox } from "../../constants/titles";
import { scrolling } from "../../actions/scrollActions";
import { withRouter } from "../../helper/WithRouter";
import { courseListType } from "../../types";
import FloatButton from "../FloatButton";
import React, { Component } from "react";
import CourseCard from "../CourseCard";
import { connect } from "react-redux";
import SearchBox from "../SearchBox";
import {
  edit,
  get,
  add,
  del,
  onUnmount,
  listSubCourses,
  confirmDeletion,
} from "../../actions/coursesActions";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onList = this.onList.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  onChange(value) {
    this.props.onUnmount();
    this.props.scrolling(() =>
      this.props.get(
        this.props.list,
        this.props.currentPage,
        this.props.nextPage,
        this.props.skip,
        value
      )
    );
  }

  onDelete(id) {
    if (this.props.busy) return;
    this.props.confirmDeletion(() =>
      this.props.del(this.props.list, this.props.skip, id)
    );
  }

  onAdd(payload) {
    if (this.props.busy) return;
    this.props.add(payload);
  }

  onList(payload) {
    this.props.listSubCourses(payload);
  }

  onEdit(payload) {
    if (this.props.busy) return;
    this.props.edit(payload);
  }

  componentDidMount() {
    this.props.scrolling(() =>
      this.props.get(
        this.props.list,
        this.props.currentPage,
        this.props.nextPage,
        this.props.skip
      )
    );
  }

  componentDidUpdate() {
    this.props.leazyLoading();
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
          {this.props.list.map((course, index) => (
            <CourseCard
              key={index}
              {...course}
              del={this.onDelete}
              edit={this.onEdit}
              add={this.onAdd}
              list={this.onList}
            />
          ))}
          <div className="dummy" />
        </div>
        <SearchBox onChange={this.onChange} placeholder={coursesSearchBox} />
        <FloatButton url="/course" icon="fas fa-folder-plus" />
      </>
    );
  }
}

Courses.propTypes = courseListType;

const mapState = (state) => ({
  currentPage: state.courses.currentPage,
  routePath: state.courses.routePath,
  nextPage: state.courses.nextPage,
  list: state.courses.list,
  skip: state.courses.skip,
  busy: state.courses.busy,
});

export default connect(mapState, {
  edit,
  get,
  add,
  del,
  scrolling,
  onUnmount,
  leazyLoading,
  listSubCourses,
  confirmDeletion,
})(withRouter(Courses));
