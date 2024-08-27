import { subCourseInputsType } from "../../types";
import FormButtonsList from "../FormButtonsList";
import * as labels from "../../constants/labels";
import React, { Component } from "react";
import CheckField from "../CheckField";
import { connect } from "react-redux";
import TextField from "../TextField";
import {
  onSave,
  reload,
  toggle,
  newEntry,
  onChange,
  onSubmit,
  onUnmount,
  onContinue,
} from "../../actions/subCourseInputsActions";

class SubCourseInputs extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onContinue = this.onContinue.bind(this);
    this.getPayload = this.getPayload.bind(this);
  }

  getPayload() {
    return {
      id: this.props.id,
      price: this.props.price,
      hours: this.props.hours,
      isActive: this.props.isActive,
      courseId: this.props.courseId,
      startDate: this.props.startDate,
    };
  }

  toggle() {
    this.props.toggle(this.props.isActive);
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
    this.props.newEntry(this.props.courseId, this.props.name);
  }

  onContinue() {
    if (this.props.busy) return;
    const payload = this.getPayload();
    this.props.onSubmit({
      ...payload,
      callback: this.props.onContinue,
    });
  }
  componentDidMount() {
    if (!this.props.courseId) this.props.reload();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }
  render() {
    return (
      <div className="page-form-container">
        <h1 className="trim">{`${this.props.title} ${this.props.name}`}</h1>
        <form onSubmit={this.onSubmit}>
          <div className="inputs-container">
            <TextField
              error={this.props.startDateErr}
              value={this.props.startDate}
              type="date"
              placeholder={labels.startDate}
              name="startDate"
              maxLength={10}
              onChange={this.props.onChange}
            />
            <TextField
              error={this.props.hoursErr}
              value={this.props.hours}
              type="text"
              placeholder={labels.hours}
              name="hours"
              maxLength={4}
              onChange={this.props.onChange}
            />
            <TextField
              error={this.props.priceErr}
              value={this.props.price}
              type="text"
              placeholder={labels.price}
              name="price"
              maxLength={5}
              onChange={this.props.onChange}
            />
            <CheckField
              value={this.props.isActive}
              placeholder={labels.courseStatus}
              toggle={this.toggle}
            />
          </div>
          <FormButtonsList
            buttOneValue={labels.submit}
            buttTowValue={labels.submitAndAssign}
            buttThreeValue={labels.newEntry}
            buttTowAction={this.onContinue}
            buttThreeAction={this.onReset}
          />
        </form>
      </div>
    );
  }
}

SubCourseInputs.propTypes = subCourseInputsType;

const mapState = (state) => ({
  id: state.subCourseInputs.id,
  name: state.subCourseInputs.name,
  busy: state.subCourseInputs.busy,
  hours: state.subCourseInputs.hours,
  price: state.subCourseInputs.price,
  isActive: state.subCourseInputs.isActive,
  priceErr: state.subCourseInputs.priceErr,
  hoursErr: state.subCourseInputs.hoursErr,
  courseId: state.subCourseInputs.courseId,
  startDate: state.subCourseInputs.startDate,
  startDateErr: state.subCourseInputs.startDateErr,
});

export default connect(mapState, {
  onSave,
  reload,
  toggle,
  newEntry,
  onChange,
  onSubmit,
  onUnmount,
  onContinue,
})(SubCourseInputs);
