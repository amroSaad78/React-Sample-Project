import "../assets/css/dashboard.css";
import "../assets/css/page_form.css";
import "../assets/css/cards.css";
import Confirmation from "../components/Confirmation";
import { withRouter } from "../helper/WithRouter";
import SidebarMap from "../helper/SidebarMap";
import * as names from "../constants/menus";
import { Outlet } from "react-router-dom";
import { dashboardType } from "../types";
import React, { Component } from "react";
import Toast from "../components/Toast";
import { connect } from "react-redux";
import Menu from "../components/Menu";
import {
  resetToast,
  getUserBasicData,
  closeConfirmation,
} from "../actions/dashboardActions";

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
    this.toggle = this.toggle.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  toggle() {
    this.state.toggle
      ? this.setState({ toggle: false })
      : this.setState({ toggle: true });
  }

  getMessages() {
    this.props.navigate("/messages");
  }

  componentDidMount() {
    this.props.getUserBasicData();
  }

  componentDidUpdate() {
    const path = this.props.routePath;
    if (path) {
      this.props.navigate(path);
    }
  }
  render() {
    return (
      <div className={`dash-container ${this.state.toggle ? "active" : ""}`}>
        <div className="main">
          <div className="menuBox">
            <Menu
              iconClass="far fa-envelope"
              number={this.props.newMessages}
              name={names.messages}
              clicked={this.getMessages}
            />
            <Menu
              iconClass="far fa-bell"
              number={320}
              name={names.alerts}
              clicked={() => {}}
            />
            <Menu
              iconClass="far fa-user"
              number={20}
              name={names.visitors}
              clicked={() => {}}
            />
            <Menu
              iconClass="fas fa-photo-video"
              number={1950}
              name={names.media}
              clicked={() => {}}
            />
          </div>
          <div className="pageBox">
            <Outlet />
            <Confirmation
              del={this.props.callback}
              show={this.props.showConfirmation}
              close={this.props.closeConfirmation}
            />
            <Toast
              type={this.props.messageType}
              message={this.props.messageBody}
              reset={this.props.resetToast}
            />
          </div>
        </div>
        <div className="side-bar">
          <div className="side-bar-toggle">
            <span onClick={this.toggle} />
          </div>
          <div className="img-container profile-img">
            <img alt="" src={this.props.imageURL} />
          </div>
          {SidebarMap.get(this.props.userRole)}
          <div className="img-container brand-logo">
            <img alt="" src="images/logo.png" />
          </div>
        </div>
      </div>
    );
  }
}

DashboardLayout.propTypes = dashboardType;

const mapState = (state) => ({
  busy: state.dashboard.busy,
  imageURL: state.dashboard.imageURL,
  userRole: state.dashboard.userRole,
  routePath: state.dashboard.routePath,
  newMessages: state.dashboard.newMessages,
  callback: state.shared.callback,
  messageType: state.shared.messageType,
  messageBody: state.shared.messageBody,
  showConfirmation: state.shared.showConfirmation,
});

export default connect(mapState, {
  resetToast,
  getUserBasicData,
  closeConfirmation,
})(withRouter(DashboardLayout));
