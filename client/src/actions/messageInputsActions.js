import axiosController from "../services/abortController";
import { Change, Reset, MessageTypes } from "./selectors";
import { SavedSuccessfully } from "../constants/messages";
import { Validator } from "../services/validate";
import * as errors from "../constants/errors";
import { Proxy } from "../services/proxy";

export const onSubmit =
  ({ id, subject, details, receiverId }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .required(subject, "subjectErr", errors.subjectError)
      .result();
    if (Object.keys(error).length) {
      return dispatch({ type: Change.MessageInputs, payload: { ...error } });
    }
    dispatch({
      type: Change.MessageInputs,
      payload: { busy: true },
    });
    const payload = { id, subject, details, receiverId };
    const response = id
      ? await Proxy.PutJsonData(`dash/message/user/${id}`, payload)
      : await Proxy.PostJsonData("dash/message/user", payload);
    dispatch({
      type: Change.MessageInputs,
      payload: { busy: false },
    });
    if (!response) return;
    if (response.errMessage) {
      return dispatch({
        type: Change.Shared,
        payload: {
          messageBody: response.errMessage,
          messageType: MessageTypes.Error,
        },
      });
    }
    dispatch({
      type: Change.MessageInputs,
      payload: { id: response.id },
    });
    dispatch({
      type: Change.Shared,
      payload: {
        messageBody: SavedSuccessfully,
        messageType: MessageTypes.Success,
      },
    });
  };

export const onUnmount = () => (dispatch) => {
  axiosController.abort();
  localStorage.removeItem("message");
  dispatch({
    type: Reset.MessageInputs,
    payload: {},
  });
};

export const reload = () => (dispatch) => {
  const message = JSON.parse(localStorage.getItem("message"));
  dispatch({
    type: Change.MessageInputs,
    payload: {
      receiverId: message?.receiverId,
      title: message?.title,
    },
  });
};

export const reset = () => (dispatch) => {
  dispatch({
    type: Change.MessageInputs,
    payload: {
      subject: "",
      details: "",
    },
  });
};

export const onChange = (e) => (dispatch) => {
  dispatch({
    type: Change.MessageInputs,
    payload: {
      [e.target.name]: e.target.value,
      [e.target.name + "Err"]: "",
    },
  });
};
