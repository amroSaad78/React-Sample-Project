import { Change, Reset, Steps, MessageTypes } from "./selectors";
import axiosController from "../services/abortController";
import { SavedSuccessfully } from "../constants/messages";
import { Validator } from "../services/validate";
import { SubCourse } from "../models/subCourse";
import * as errors from "../constants/errors";
import { Proxy } from "../services/proxy";

export const onSubmit =
  ({ id, price, hours, isActive, courseId, startDate, callback }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .isNumbersOnly(price, "priceErr", errors.invalidPrice)
      .required(price, "priceErr", errors.requiredPrice)
      .isNumbersOnly(hours, "hoursErr", errors.invalidHours)
      .required(hours, "hoursErr", errors.requiredHours)
      .isValidDate(startDate, "startDateErr", errors.invalidStartDate)
      .result();
    if (Object.keys(error).length) {
      return dispatch({ type: Change.SubCourseInputs, payload: { ...error } });
    }
    dispatch({
      type: Change.SubCourseInputs,
      payload: { busy: true },
    });
    const payload = new SubCourse(courseId, price, hours, isActive, startDate);
    const response = id
      ? await Proxy.PutJsonData(`dash/subcourse/${id}`, payload)
      : await Proxy.PostJsonData("dash/subcourse", payload);
    dispatch({ type: Change.SubCourseInputs, payload: { busy: false } });
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
    type: Change.AssignUsers,
    payload: {
      subCourseId: id,
    },
  });
  dispatch({
    type: Change.SubCourse,
    payload: {
      state: Steps.SubCourse.Assign,
    },
  });
};

export const newEntry = (courseId, name) => (dispatch) => {
  dispatch({
    type: Change.SubCourse,
    payload: {
      state: Steps.SubCourse.New,
    },
  });
  dispatch({
    type: Reset.SubCourseInputs,
    payload: { courseId: courseId, name: name },
  });
};

export const onUnmount = () => (dispatch) => {
  axiosController.abort();
  dispatch({
    type: Reset.SubCourseInputs,
    payload: { courseId: "", name: "" },
  });
};

export const onSave = (id) => (dispatch) => {
  dispatch({
    type: Change.SubCourseInputs,
    payload: { id: id },
  });
  dispatch({
    type: Change.SubCourse,
    payload: { state: Steps.SubCourse.Edit },
  });
};

export const toggle = (isActive) => (dispatch) => {
  dispatch({
    type: Change.SubCourseInputs,
    payload: { isActive: !isActive },
  });
};

export const reload = () => (dispatch) => {
  const course = JSON.parse(localStorage.getItem("course"));
  dispatch({
    type: Change.SubCourseInputs,
    payload: { courseId: course?.courseId, name: course?.name },
  });
};

export const onChange = (e) => (dispatch) => {
  dispatch({
    type: Change.SubCourseInputs,
    payload: {
      [e.target.name]: e.target.value,
      [e.target.name + "Err"]: "",
    },
  });
};
