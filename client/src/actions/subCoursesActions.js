import axiosController from "../services/abortController";
import { Change, MessageTypes, Reset, Steps } from "./selectors";
import { Proxy } from "../services/proxy";

export const get =
  (courseId, subCourses, current, next, skip = 0) =>
  async (dispatch) => {
    if (current === next) return;
    dispatch({
      type: Change.SubCourses,
      payload: { busy: true },
    });
    const response = await Proxy.GetData(
      `dash/subcourse/${courseId}/${next}/${skip}`
    );
    dispatch({ type: Change.SubCourses, payload: { busy: false } });
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
    let list = [...subCourses];
    list.push(...response.subcourses);
    dispatch({
      type: Change.SubCourses,
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

export const del = (subCourses, skip, id) => async (dispatch) => {
  dispatch({
    type: Change.Shared,
    payload: {
      callback: Function,
      showConfirmation: false,
    },
  });
  dispatch({
    type: Change.SubCourses,
    payload: { busy: true },
  });
  const response = await Proxy.DeleteData(`dash/subcourse/${id}`);
  dispatch({ type: Change.SubCourses, payload: { busy: false } });
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
  let list = subCourses.filter((subCourse) => subCourse.id !== id);
  dispatch({
    type: Change.SubCourses,
    payload: { list: list, skip: skip + 1 },
  });
};

export const toggle = (subCourses, id, isActive) => async (dispatch) => {
  let list = subCourses.map((subCourse) =>
    subCourse.id === id ? { ...subCourse, isActive: !isActive } : subCourse
  );
  dispatch({
    type: Change.SubCourses,
    payload: { list: list, busy: true },
  });
  const response = await Proxy.PutJsonData(`dash/subcourse/toggle/${id}`, {
    isActive: isActive,
  });
  dispatch({ type: Change.SubCourses, payload: { busy: false } });
  if (!response) return;
  if (response.errMessage) {
    let list = subCourses.map((subCourse) =>
      subCourse.id === id ? { ...subCourse, isActive: isActive } : subCourse
    );
    dispatch({
      type: Change.SubCourses,
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

export const reload = () => (dispatch) => {
  const course = JSON.parse(localStorage.getItem("course"));
  dispatch({
    type: Change.SubCourses,
    payload: { courseId: course?.courseId, name: course?.name },
  });
};

export const edit = (payload) => (dispatch) => {
  const url = "/subcourses";
  localStorage.setItem(
    "course",
    JSON.stringify({
      courseId: payload.courseId,
      name: payload.name,
      url: url,
    })
  );
  dispatch({
    type: Change.SubCourseInputs,
    payload: { ...payload },
  });
  dispatch({
    type: Change.SubCourse,
    payload: { state: Steps.SubCourse.Edit, url: url },
  });
  dispatch({
    type: Change.SubCourses,
    payload: { routePath: "/subcourse" },
  });
};

export const sendMessage =
  ({ subCourseId, title }) =>
  (dispatch) => {
    localStorage.setItem("message", JSON.stringify({ subCourseId, title }));
    dispatch({
      type: Change.GroupMessage,
      payload: { subCourseId, title },
    });
    dispatch({
      type: Change.SubCourses,
      payload: { routePath: "/groupmessage" },
    });
  };

export const onUnmount = () => (dispatch) => {
  axiosController.abort();
  dispatch({
    type: Reset.Shared,
    payload: {},
  });
  dispatch({
    type: Reset.SubCourses,
    payload: {},
  });
};
