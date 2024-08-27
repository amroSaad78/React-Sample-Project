import { Change, Reset, Steps } from "../actions/selectors";

const initialState = {
  state: Steps.User.New,
};

const userReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.User:
      return { ...state, ...payload };
    case Reset.User:
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;
