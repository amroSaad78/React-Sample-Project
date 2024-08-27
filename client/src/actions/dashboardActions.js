import { config } from "../config/configurations";
import { Proxy } from "../services/proxy";
import { Change, MessageTypes } from "./selectors";

export const getUserBasicData = () => async (dispatch) => {
  dispatch({
    type: Change.Dashboard,
    payload: { busy: true, routePath: "" },
  });
  const response = await Proxy.GetData("dash/user/basic");
  dispatch({ type: Change.Dashboard, payload: { busy: false } });
  if (response.errMessage) {
    return dispatch({
      type: Change.Dashboard,
      payload: { routePath: "/auth" },
    });
  }
  dispatch({
    type: Change.Dashboard,
    payload: {
      userRole: response.userRole,
      imageURL: `${config.API_URL}/${response.imageURL}`,
      newMessages: response.newMessages,
    },
  });
};

export const closeConfirmation = () => (dispatch) => {
  dispatch({
    type: Change.Shared,
    payload: {
      callback: Function,
      showConfirmation: false,
    },
  });
};

export const resetToast = () => (dispatch) => {
  dispatch({
    type: Change.Shared,
    payload: {
      messageBody: "",
      messageType: MessageTypes.None,
    },
  });
};
