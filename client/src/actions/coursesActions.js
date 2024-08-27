import axiosController from "../services/abortController";
import { Change, MessageTypes, Reset, Steps } from "./selectors";
import { Proxy } from "../services/proxy";

export const get =
  (courses, current, next, skip = 0, criteria = "") =>
  async (dispatch) => {
    if (current === next) return;
    dispatch({
      type: Change.Courses,
      payload: { busy: true },
    });
    const response = await Proxy.GetData(
      `dash/course/pages/${next}/${skip}/${criteria}`
    );
    dispatch({ type: Change.Courses, payload: { busy: false } });
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
    let list = [...courses];
    list.push(...response.courses);
    dispatch({
      type: Change.Courses,
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

export const del = (courses, skip, id) => async (dispatch) => {
  dispatch({
    type: Change.Shared,
    payload: {
      callback: Function,
      showConfirmation: false,
    },
  });
  dispatch({
    type: Change.Courses,
    payload: { busy: true },
  });
  const response = await Proxy.DeleteData(`dash/course/${id}`);
  dispatch({ type: Change.Courses, payload: { busy: false } });
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
  let list = courses.filter((course) => course.id !== id);
  dispatch({
    type: Change.Courses,
    payload: { list: list, skip: skip + 1 },
  });
};

export const add = (payload) => (dispatch) => {
  localStorage.setItem("course", JSON.stringify({ ...payload }));
  dispatch({
    type: Change.SubCourseInputs,
    payload: { ...payload },
  });
  dispatch({
    type: Change.SubCourse,
    payload: { state: Steps.SubCourse.New },
  });
  dispatch({
    type: Change.Courses,
    payload: { routePath: "/subcourse" },
  });
};

export const edit = (payload) => (dispatch) => {
  dispatch({
    type: Change.CourseInputs,
    payload: { ...payload },
  });
  dispatch({
    type: Change.Course,
    payload: { state: Steps.Course.Edit },
  });
  dispatch({
    type: Change.Courses,
    payload: { routePath: "/course" },
  });
};

export const listSubCourses = (payload) => (dispatch) => {
  localStorage.setItem("course", JSON.stringify({ ...payload }));
  dispatch({
    type: Change.SubCourses,
    payload: { ...payload },
  });
  dispatch({
    type: Change.Courses,
    payload: { routePath: "/subcourses" },
  });
};

export const onUnmount = () => (dispatch) => {
  axiosController.abort();
  dispatch({
    type: Reset.Shared,
    payload: {},
  });
  dispatch({
    type: Reset.Courses,
    payload: {},
  });
};
