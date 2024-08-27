import * as labels from "../../constants/labels";
import { groupMessageType } from "../../types";
import React, { Component } from "react";
import FloatButton from "../FloatButton";
import FormTowBtns from "../FormTowBtns";
import { connect } from "react-redux";
import TextField from "../TextField";
import TextArea from "../TextArea";
import {
  reset,
  reload,
  onChange,
  onSubmit,
  onUnmount,
} from "../../actions/groupMessageActions";

class GroupMessage extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.getPayload = this.getPayload.bind(this);
  }

  getPayload() {
    return {
      subject: this.props.subject,
      details: this.props.details,
      subCourseId: this.props.subCourseId,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.busy) return;
    const payload = this.getPayload();
    this.props.onSubmit({
      ...payload,
      callbak: this.props.reset,
    });
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  componentDidMount() {
    if (!this.props.subCourseId) this.props.reload();
  }

  render() {
    return (
      <>
        <div className="page-form-container">
          <h1 className="trim">{this.props.title}</h1>
          <form onSubmit={this.onSubmit}>
            <div className="inputs-container">
              <TextField
                error={this.props.subjectErr}
                value={this.props.subject}
                type="text"
                placeholder={labels.messageSubject}
                name="subject"
                maxLength={100}
                onChange={this.props.onChange}
              />
              <TextArea
                value={this.props.details}
                placeholder={labels.messageBody}
                name="details"
                maxLength={2000}
                onChange={this.props.onChange}
              />
            </div>
            <FormTowBtns
              leftBtn={labels.reset}
              rightBtn={labels.submit}
              onClick={this.props.reset}
            />
          </form>
        </div>
        <FloatButton url="/subcourses" icon="fas fa-angle-left" />
      </>
    );
  }
}

GroupMessage.propTypes = groupMessageType;

const mapState = (state) => ({
  subCourseId: state.groupMessage.subCourseId,
  subjectErr: state.groupMessage.subjectErr,
  subject: state.groupMessage.subject,
  details: state.groupMessage.details,
  title: state.groupMessage.title,
  busy: state.groupMessage.busy,
});

export default connect(mapState, {
  reset,
  reload,
  onChange,
  onSubmit,
  onUnmount,
})(GroupMessage);
