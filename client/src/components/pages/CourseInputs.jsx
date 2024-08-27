import FormButtonsList from "../FormButtonsList";
import * as labels from "../../constants/labels";
import { courseInputsType } from "../../types";
import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "../TextField";
import TextArea from "../TextArea";
import {
  onSave,
  newEntry,
  onChange,
  onSubmit,
  onUnmount,
  onContinue,
} from "../../actions/courseInputsActions";

class CourseInputs extends Component {
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
      name: this.props.name,
      details: this.props.details,
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
              placeholder={labels.courseName}
              name="name"
              maxLength={100}
              onChange={this.props.onChange}
            />
            <TextArea
              value={this.props.details}
              placeholder={labels.courseDetails}
              name="details"
              maxLength={1000}
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

CourseInputs.propTypes = courseInputsType;

const mapState = (state) => ({
  id: state.courseInputs.id,
  name: state.courseInputs.name,
  nameErr: state.courseInputs.nameErr,
  details: state.courseInputs.details,
  busy: state.courseInputs.busy,
});

export default connect(mapState, {
  onSave,
  newEntry,
  onChange,
  onSubmit,
  onUnmount,
  onContinue,
})(CourseInputs);
