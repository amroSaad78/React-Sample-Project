import axiosController from "../services/abortController";
import { Change, Reset, MessageTypes } from "./selectors";
import { SavedSuccessfully } from "../constants/messages";
import { Validator } from "../services/validate";
import * as errors from "../constants/errors";
import { Proxy } from "../services/proxy";

export const onSubmit =
  ({ subject, details, subCourseId, callbak }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .required(subject, "subjectErr", errors.subjectError)
      .result();
    if (Object.keys(error).length) {
      return dispatch({ type: Change.GroupMessage, payload: { ...error } });
    }
    dispatch({
      type: Change.GroupMessage,
      payload: { busy: true },
    });
    const payload = { subject, details, subCourseId };
    const response = await Proxy.PostJsonData(
      "dash/message/subcourse",
      payload
    );
    dispatch({
      type: Change.GroupMessage,
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
    callbak();
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
    type: Reset.GroupMessage,
    payload: {},
  });
};

export const reload = () => (dispatch) => {
  const message = JSON.parse(localStorage.getItem("message"));
  dispatch({
    type: Change.GroupMessage,
    payload: {
      subCourseId: message?.subCourseId,
      title: message?.title,
    },
  });
};

export const reset = () => (dispatch) => {
  dispatch({
    type: Change.GroupMessage,
    payload: {
      subject: "",
      details: "",
    },
  });
};

export const onChange = (e) => (dispatch) => {
  dispatch({
    type: Change.GroupMessage,
    payload: {
      [e.target.name]: e.target.value,
      [e.target.name + "Err"]: "",
    },
  });
};
