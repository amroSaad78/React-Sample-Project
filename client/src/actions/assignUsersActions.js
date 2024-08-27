import axiosController from "../services/abortController";
import { Change, MessageTypes, Reset } from "./selectors";
import { Proxy } from "../services/proxy";

export const get =
  (users, subCourseId, current, next, criteria = "") =>
  async (dispatch) => {
    if (current === next) return;
    dispatch({
      type: Change.AssignUsers,
      payload: { busy: true },
    });
    const response = await Proxy.GetData(
      `dash/assign/user/pages/${next}/subcourses/${subCourseId}/${criteria}`
    );
    dispatch({ type: Change.AssignUsers, payload: { busy: false } });
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
      type: Change.AssignUsers,
      payload: {
        list: list,
        currentPage: next,
        nextPage: response.next,
      },
    });
  };

export const toggle =
  (users, userId, subCourseId, checked) => async (dispatch) => {
    let list = users.map((user) =>
      user.id === userId ? { ...user, checked: !checked } : user
    );
    dispatch({
      type: Change.AssignUsers,
      payload: { list: list, busy: true },
    });
    const response = await Proxy.PutJsonData(
      `dash/assign/user/toggle/${userId}`,
      {
        subCourseId,
        checked: !checked,
      }
    );
    dispatch({ type: Change.AssignUsers, payload: { busy: false } });
    if (!response) return;
    if (response.errMessage) {
      let list = users.map((user) =>
        user.id === userId ? { ...user, checked: checked } : user
      );
      dispatch({
        type: Change.AssignUsers,
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

export const reset = (subCourseId) => (dispatch) => {
  axiosController.abort();
  dispatch({
    type: Reset.Shared,
    payload: {},
  });
  dispatch({
    type: Reset.AssignUsers,
    payload: { subCourseId },
  });
};
