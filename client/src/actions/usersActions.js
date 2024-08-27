import axiosController from "../services/abortController";
import { Change, MessageTypes, Reset, Steps } from "./selectors";
import { Proxy } from "../services/proxy";

export const get =
  (users, current, next, skip = 0, criteria = "") =>
  async (dispatch) => {
    if (current === next) return;
    dispatch({
      type: Change.Users,
      payload: { busy: true },
    });
    const response = await Proxy.GetData(
      `dash/user/pages/${next}/${skip}/${criteria}`
    );
    dispatch({ type: Change.Users, payload: { busy: false } });
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
    let list = [...users];
    list.push(...response.users);
    dispatch({
      type: Change.Users,
      payload: {
        list: list,
        currentPage: next,
        nextPage: response.next,
      },
    });
  };

export const confirmDeletion = (callback) => (dispatch) => {
  dispatch({
    type: Change.Shared,
    payload: {
      callback: callback,
      showConfirmation: true,
    },
  });
};

export const del = (users, skip, id) => async (dispatch) => {
  dispatch({
    type: Change.Shared,
    payload: {
      callback: Function,
      showConfirmation: false,
    },
  });
  dispatch({
    type: Change.Users,
    payload: { busy: true },
  });
  const response = await Proxy.DeleteData(`dash/user/${id}`);
  dispatch({ type: Change.Users, payload: { busy: false } });
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
  let list = users.filter((user) => user.id !== id);
  dispatch({
    type: Change.Users,
    payload: { list: list, skip: skip + 1 },
  });
};

export const toggle = (users, id, isActive) => async (dispatch) => {
  let list = users.map((user) =>
    user.id === id ? { ...user, isActive: !isActive } : user
  );
  dispatch({
    type: Change.Users,
    payload: { list: list, busy: true },
  });
  const response = await Proxy.PutJsonData(`dash/user/toggle/${id}`, {
    isActive: isActive,
  });
  dispatch({ type: Change.Users, payload: { busy: false } });
  if (!response) return;
  if (response.errMessage) {
    let list = users.map((user) =>
      user.id === id ? { ...user, isActive: isActive } : user
    );
    dispatch({
      type: Change.Users,
      payload: { list: list },
    });
    return dispatch({
      type: Change.Shared,
      payload: {
        messageBody: response.errMessage,
        messageType: MessageTypes.Error,
      },
    });
  }
};

export const edit = (payload) => (dispatch) => {
  dispatch({
    type: Change.UserInputs,
    payload: { ...payload },
  });
  dispatch({
    type: Change.User,
    payload: { state: Steps.User.Edit },
  });
  dispatch({
    type: Change.Users,
    payload: { routePath: "/user" },
  });
};

export const sendMessage =
  ({ receiverId, title }) =>
  (dispatch) => {
    localStorage.setItem("message", JSON.stringify({ receiverId, title }));
    dispatch({
      type: Change.MessageInputs,
      payload: { receiverId, title },
    });
    dispatch({
      type: Change.Users,
      payload: { routePath: "/message" },
    });
  };

export const onUnmount = () => (dispatch) => {
  axiosController.abort();
  dispatch({
    type: Reset.Shared,
    payload: {},
  });
  dispatch({
    type: Reset.Users,
    payload: {},
  });
};
