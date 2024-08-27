import { leazyLoading } from "../../actions/leazyLoadingActions";
import { scrolling } from "../../actions/scrollActions";
import { usersSearchBox } from "../../constants/titles";
import { withRouter } from "../../helper/WithRouter";
import { userListType } from "../../types";
import FloatButton from "../FloatButton";
import ProfileCard from "../ProfileCard";
import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBox from "../SearchBox";
import {
  edit,
  get,
  del,
  toggle,
  onUnmount,
  sendMessage,
  confirmDeletion,
} from "../../actions/usersActions";

class Users extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSend = this.onSend.bind(this);
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

  onEdit(payload) {
    if (this.props.busy) return;
    this.props.edit(payload);
  }

  onSend(payload) {
    if (this.props.busy) return;
    this.props.sendMessage(payload);
  }

  onToggle({ id, isActive }) {
    if (this.props.busy) return;
    this.props.toggle(this.props.list, id, isActive);
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
          {this.props.list.map((user, index) => (
            <ProfileCard
              key={index}
              {...user}
              del={this.onDelete}
              edit={this.onEdit}
              send={this.onSend}
              toggle={this.onToggle}
            />
          ))}
          <div className="dummy" />
        </div>
        <SearchBox onChange={this.onChange} placeholder={usersSearchBox} />
        <FloatButton url="/user" icon="fas fa-user-plus" />
      </>
    );
  }
}

Users.propTypes = userListType;

const mapState = (state) => ({
  currentPage: state.users.currentPage,
  routePath: state.users.routePath,
  nextPage: state.users.nextPage,
  list: state.users.list,
  skip: state.users.skip,
  busy: state.users.busy,
});

export default connect(mapState, {
  edit,
  get,
  del,
  toggle,
  scrolling,
  onUnmount,
  sendMessage,
  leazyLoading,
  confirmDeletion,
})(withRouter(Users));
