import { withDispatch } from "../../helper/WithDispatch";
import { cleanUp } from "../../actions/cleanUpActions";
import { withRouter } from "../../helper/WithRouter";
import * as titles from "../../constants/titles";
import { verficationType } from "../../types";
import React, { Component } from "react";
import DoubleBtns from "../DoubleBtns";
import { connect } from "react-redux";
import AuthField from "../AuthField";
import {
  onSubmit,
  codeRequest,
  onChange,
} from "../../actions/verficationActions";

class VerficationForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.codeRequest = this.codeRequest.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.busy) return;
    const payload = {
      email: this.props.email,
      code: this.props.code,
      verficationPath: this.props.verficationPath,
    };
    this.props.onSubmit(payload);
  }

  codeRequest() {
    if (this.props.busy) return;
    const payload = {
      email: this.props.email,
      codeRequestPath: this.props.codeRequestPath,
    };
    this.props.codeRequest(payload);
  }

  componentDidUpdate() {
    const path = this.props.routePath;
    if (path) {
      this.props.dispatch(cleanUp());
      this.props.navigate(path);
    }
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className={`auth-form ${this.props.direction}`}
      >
        <h2 className="title">{titles.verficationForm}</h2>
        <p className={`message ${this.props.errorMessage ? "error" : "info"}`}>
          {this.props.errorMessage
            ? this.props.errorMessage
            : this.props.infoMessage}
        </p>
        <AuthField
          error={this.props.codeErr}
          type="text"
          placeholder={titles.verfCode}
          name="code"
          value={this.props.code}
          icon="fa-key"
          maxLength="15"
          onChange={this.props.onChange}
        />
        <DoubleBtns
          leftBtn={titles.reSendBtn}
          rightBtn={titles.verficationBtn}
          onClick={this.codeRequest}
        />
      </form>
    );
  }
}

VerficationForm.propTypes = verficationType;

const mapState = (state) => ({
  email: state.verfication.email,
  code: state.verfication.code,
  codeErr: state.verfication.codeErr,
  infoMessage: state.verfication.infoMessage,
  errorMessage: state.verfication.errorMessage,
  verficationPath: state.verfication.verficationPath,
  codeRequestPath: state.verfication.codeRequestPath,
  routePath: state.verfication.routePath,
  busy: state.verfication.busy,
});

export default connect(mapState, { onChange, onSubmit, codeRequest })(
  withRouter(withDispatch(VerficationForm))
);
