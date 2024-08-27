import { Change, Reset } from "./selectors";

export const reload = () => (dispatch) => {
  const course = JSON.parse(localStorage.getItem("course"));
  dispatch({
    type: Change.SubCourse,
    payload: { url: course?.url || "/courses" },
  });
};

export const onUnmount = () => (dispatch) => {
  dispatch({
    type: Reset.SubCourse,
    payload: {},
  });
};
