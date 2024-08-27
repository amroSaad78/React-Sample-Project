import * as labels from "../../constants/labels";
import { messageInputsType } from "../../types";
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
} from "../../actions/messageInputsActions";

class MessageInputs extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.getPayload = this.getPayload.bind(this);
  }

  getPayload() {
    return {
      id: this.props.id,
      subject: this.props.subject,
      details: this.props.details,
      receiverId: this.props.receiverId,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.busy) return;
    const payload = this.getPayload();
    this.props.onSubmit({
      ...payload,
    });
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  componentDidMount() {
    if (!this.props.receiverId) this.props.reload();
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
        <FloatButton url="/users" icon="fas fa-angle-left" />
      </>
    );
  }
}

MessageInputs.propTypes = messageInputsType;

const mapState = (state) => ({
  receiverId: state.messageInputs.receiverId,
  subjectErr: state.messageInputs.subjectErr,
  subject: state.messageInputs.subject,
  details: state.messageInputs.details,
  title: state.messageInputs.title,
  busy: state.messageInputs.busy,
  id: state.messageInputs.id,
});

export default connect(mapState, {
  reload,
  reset,
  onChange,
  onSubmit,
  onUnmount,
})(MessageInputs);
