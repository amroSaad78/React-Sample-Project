import "../../assets/css/page_form.css";
import * as labels from "../../constants/labels";
import FormButtonsList from "../FormButtonsList";
import { userInputsType } from "../../types";
import OptionsField from "../OptionsField";
import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "../TextField";
import {
  onSave,
  newEntry,
  onChange,
  onSubmit,
  onUnmount,
  onContinue,
} from "../../actions/userInputsActions";

class UserInputs extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onContinue = this.onContinue.bind(this);
    this.getPayload = this.getPayload.bind(this);
  }

  getPayload() {
    return {
      id: this.props.id,
      tel: this.props.tel,
      role: this.props.role,
      name: this.props.name,
      email: this.props.email,
      identity: this.props.identity,
      password: this.props.password,
      confPass: this.props.confPass,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.busy) return;
    const payload = this.getPayload();
    this.props.onSubmit({
      ...payload,
      callback: this.props.onSave,
    });
  }

  onReset() {
    if (this.props.busy) return;
    this.props.newEntry();
  }

  onContinue() {
    if (this.props.busy) return;
    const payload = this.getPayload();
    this.props.onSubmit({
      ...payload,
      callback: this.props.onContinue,
    });
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }
  render() {
    return (
      <div className="page-form-container">
        <h1 className="trim">{this.props.title}</h1>
        <form onSubmit={this.onSubmit}>
          <div className="inputs-container">
            <TextField
              error={this.props.nameErr}
              value={this.props.name}
              type="text"
              placeholder={labels.userName}
              name="name"
              maxLength={50}
              onChange={this.props.onChange}
            />
            <TextField
              error={this.props.emailErr}
              value={this.props.email}
              type="text"
              placeholder={labels.userEmail}
              name="email"
              maxLength={50}
              onChange={this.props.onChange}
            />

            <TextField
              error={this.props.identityErr}
              value={this.props.identity}
              type="text"
              placeholder={labels.userIdentity}
              name="identity"
              maxLength={10}
              onChange={this.props.onChange}
            />
            <TextField
              error={this.props.telErr}
              value={this.props.tel}
              type="text"
              placeholder={labels.userTel}
              name="tel"
              maxLength={11}
              onChange={this.props.onChange}
            />

            <TextField
              error={this.props.passwordErr}
              value={this.props.password}
              type="password"
              placeholder={labels.userPassword}
              name="password"
              maxLength={12}
              autoComplete="on"
              onChange={this.props.onChange}
            />
            <TextField
              error={this.props.confPassErr}
              value={this.props.confPass}
              type="password"
              placeholder={labels.userConfirmation}
              name="confPass"
              maxLength={12}
              autoComplete="on"
              onChange={this.props.onChange}
            />

            <OptionsField
              error={this.props.roleErr}
              value={this.props.role}
              placeholder={labels.userRole}
              name="role"
              onChange={this.props.onChange}
            />
          </div>
          <FormButtonsList
            buttOneValue={labels.submit}
            buttTowValue={labels.submitAndContinue}
            buttThreeValue={labels.newEntry}
            buttTowAction={this.onContinue}
            buttThreeAction={this.onReset}
          />
        </form>
      </div>
    );
  }
}

UserInputs.propTypes = userInputsType;

const mapState = (state) => ({
  id: state.userInputs.id,
  email: state.userInputs.email,
  emailErr: state.userInputs.emailErr,
  name: state.userInputs.name,
  nameErr: state.userInputs.nameErr,
  tel: state.userInputs.tel,
  telErr: state.userInputs.telErr,
  identity: state.userInputs.identity,
  identityErr: state.userInputs.identityErr,
  password: state.userInputs.password,
  passwordErr: state.userInputs.passwordErr,
  confPass: state.userInputs.confPass,
  confPassErr: state.userInputs.confPassErr,
  role: state.userInputs.role,
  roleErr: state.userInputs.roleErr,
  busy: state.userInputs.busy,
});

export default connect(mapState, {
  onSave,
  newEntry,
  onChange,
  onSubmit,
  onUnmount,
  onContinue,
})(UserInputs);
