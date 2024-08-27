import { onUnmount } from "../../actions/userActions";
import { UserMap } from "../../helper/UserMap";
import FloatButton from "../FloatButton";
import React, { Component } from "react";
import { userType } from "../../types";
import { connect } from "react-redux";

class User extends Component {
  componentWillUnmount() {
    this.props.onUnmount();
  }
  render() {
    return (
      <>
        {UserMap.get(this.props.state)}
        <FloatButton url="/users" icon="fas fa-angle-left" />
      </>
    );
  }
}

User.propTypes = userType;

const mapState = (state) => ({
  state: state.user.state,
});

export default connect(mapState, { onUnmount })(User);
