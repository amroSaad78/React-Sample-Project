import { get, toggle, reset } from "../../actions/assignUsersActions";
import { leazyLoading } from "../../actions/leazyLoadingActions";
import { scrolling } from "../../actions/scrollActions";
import { usersSearchBox } from "../../constants/titles";
import { assignUserslistType } from "../../types";
import React, { Component } from "react";
import AssignCard from "../AssignCard";
import { connect } from "react-redux";
import SearchBox from "../SearchBox";

class AssignUsers extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onChange(value) {
    this.props.reset(this.props.subCourseId);
    this.props.scrolling(() =>
      this.props.get(
        this.props.list,
        this.props.subCourseId,
        this.props.currentPage,
        this.props.nextPage,
        value
      )
    );
  }

  onToggle({ userId, checked }) {
    if (this.props.busy) return;
    this.props.toggle(this.props.list, userId, this.props.subCourseId, checked);
  }

  componentDidMount() {
    this.props.scrolling(() =>
      this.props.get(
        this.props.list,
        this.props.subCourseId,
        this.props.currentPage,
        this.props.nextPage
      )
    );
  }

  componentDidUpdate() {
    this.props.leazyLoading();
  }

  componentWillUnmount() {
    this.props.reset("");
  }
  render() {
    return (
      <>
        <div className="cards-container">
          {this.props.list.map((user, index) => (
            <AssignCard key={index} {...user} toggle={this.onToggle} />
          ))}
          <div className="dummy" />
        </div>
        <SearchBox onChange={this.onChange} placeholder={usersSearchBox} />
      </>
    );
  }
}

AssignUsers.propTypes = assignUserslistType;

const mapState = (state) => ({
  subCourseId: state.assignUsers.subCourseId,
  currentPage: state.assignUsers.currentPage,
  nextPage: state.assignUsers.nextPage,
  list: state.assignUsers.list,
  busy: state.assignUsers.busy,
});

export default connect(mapState, {
  get,
  reset,
  toggle,
  scrolling,
  leazyLoading,
})(AssignUsers);
