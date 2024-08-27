import { Reset } from "./selectors";

export const onUnmount = () => (dispatch) => {
  dispatch({
    type: Reset.User,
    payload: {},
  });
};
