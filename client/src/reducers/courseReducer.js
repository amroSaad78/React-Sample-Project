import { Change, Reset, Steps } from "../actions/selectors";

const initialState = {
  state: Steps.Course.New,
};

const courseReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.Course:
      return { ...state, ...payload };
    case Reset.Course:
      return { ...initialState };
    default:
      return state;
  }
};

export default courseReducer;
