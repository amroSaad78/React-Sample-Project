import { Change, Reset, Steps, MessageTypes } from "./selectors";
import axiosController from "../services/abortController";
import { SavedSuccessfully } from "../constants/messages";
import { config } from "../config/configurations";
import { Validator } from "../services/validate";
import * as errors from "../constants/errors";
import { Proxy } from "../services/proxy";
import { Course } from "../models/course";

export const onSubmit =
  ({ id, name, details, callback }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .between(name, 3, 100, "nameErr", errors.invalidName)
      .required(name, "nameErr", errors.requiredName)
      .result();
    if (Object.keys(error).length) {
      return dispatch({ type: Change.CourseInputs, payload: { ...error } });
    }
    dispatch({
      type: Change.CourseInputs,
      payload: { busy: true },
    });
    const payload = new Course(name, details);
    const response = id
      ? await Proxy.PutJsonData(`dash/course/${id}`, payload)
      : await Proxy.PostJsonData("dash/course", payload);
    dispatch({
      type: Change.CourseInputs,
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
    callback(response.id);
    dispatch({
      type: Change.Shared,
      payload: {
        messageBody: SavedSuccessfully,
        messageType: MessageTypes.Success,
      },
    });
  };

export const onContinue = (id) => (dispatch) => {
  dispatch({
    type: Change.Image,
    payload: {
      url: `dash/course/image/${id}`,
      imgUrl: `${config.API_URL}/pics/course/${id}`,
      callback: () =>
        dispatch({
          type: Change.Course,
          payload: {
            state: Steps.Course.New,
          },
        }),
    },
  });
  dispatch({
    type: Change.Course,
    payload: {
      state: Steps.Course.Image,
    },
  });
};

export const newEntry = () => (dispatch) => {
  dispatch({
    type: Change.Course,
    payload: {
      state: Steps.Course.New,
    },
  });
  dispatch({
    type: Reset.CourseInputs,
    payload: {},
  });
};

export const onUnmount = () => (dispatch) => {
  axiosController.abort();
  dispatch({
    type: Reset.CourseInputs,
    payload: {},
  });
};

export const onSave = (id) => (dispatch) => {
  dispatch({
    type: Change.CourseInputs,
    payload: { id: id },
  });
  dispatch({
    type: Change.Course,
    payload: { state: Steps.Course.Edit },
  });
};

export const onChange = (e) => (dispatch) => {
  dispatch({
    type: Change.CourseInputs,
    payload: {
      [e.target.name]: e.target.value,
      [e.target.name + "Err"]: "",
    },
  });
};
