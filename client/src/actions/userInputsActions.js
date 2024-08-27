import { Change, Reset, Steps, MessageTypes } from "./selectors";
import axiosController from "../services/abortController";
import { SavedSuccessfully } from "../constants/messages";
import { config } from "../config/configurations";
import { Validator } from "../services/validate";
import * as errors from "../constants/errors";
import { Proxy } from "../services/proxy";
import { User } from "../models/user";

export const onSubmit =
  ({ id, name, email, tel, role, identity, password, confPass, callback }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .between(name, 3, 50, "nameErr", errors.invalidName)
      .required(name, "nameErr", errors.requiredName)
      .isValidEmail(email, "emailErr", errors.invalidEmail)
      .required(email, "emailErr", errors.requiredEmail)
      .isValidTel(tel, "telErr", errors.invalidTel)
      .required(tel, "telErr", errors.requiredTel)
      .isValidLength(identity, 10, "identityErr", errors.invalidIdentity)
      .required(identity, "identityErr", errors.requiredIdentity)
      .isSecure(password, "passwordErr", errors.weakPassword)
      .required(password, "passwordErr", errors.requiredPassword)
      .isEqual(password, confPass, "confPassErr", errors.invalidConfirmation)
      .required(role, "roleErr", errors.requiredRole)
      .result();
    if (Object.keys(error).length) {
      return dispatch({ type: Change.UserInputs, payload: { ...error } });
    }
    dispatch({
      type: Change.UserInputs,
      payload: { busy: true },
    });
    const payload = new User(name, email, password, tel, identity, role);
    const response = id
      ? await Proxy.PutJsonData(`dash/user/${id}`, payload)
      : await Proxy.PostJsonData("dash/user", payload);
    dispatch({
      type: Change.UserInputs,
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
      url: `dash/user/image/${id}`,
      imgUrl: `${config.API_URL}/pics/user/${id}`,
      callback: () =>
        dispatch({
          type: Change.User,
          payload: {
            state: Steps.User.New,
          },
        }),
    },
  });
  dispatch({
    type: Change.User,
    payload: {
      state: Steps.User.Image,
    },
  });
};

export const newEntry = () => (dispatch) => {
  dispatch({
    type: Change.User,
    payload: {
      state: Steps.User.New,
    },
  });
  dispatch({
    type: Reset.UserInputs,
    payload: {},
  });
};

export const onUnmount = () => (dispatch) => {
  axiosController.abort();
  dispatch({
    type: Reset.UserInputs,
    payload: {},
  });
};

export const onSave = (id) => (dispatch) => {
  dispatch({
    type: Change.UserInputs,
    payload: { id: id },
  });
  dispatch({
    type: Change.User,
    payload: { state: Steps.User.Edit },
  });
};

export const onChange = (e) => (dispatch) => {
  dispatch({
    type: Change.UserInputs,
    payload: {
      [e.target.name]: e.target.value,
      [e.target.name + "Err"]: "",
    },
  });
};
