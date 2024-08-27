import { Reset } from "./selectors";

export const onUnmount = () => (dispatch) => {
  dispatch({
    type: Reset.Course,
    payload: {},
  });
};
