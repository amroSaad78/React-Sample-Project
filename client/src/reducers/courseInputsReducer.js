import { Change, Reset } from "../actions/selectors";

const initialState = {
  id: "",
  name: "",
  details: "",
  nameErr: "",
  busy: false,
};

const courseInputsReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.CourseInputs:
      return { ...state, ...payload };
    case Reset.CourseInputs:
      return { ...initialState };
    default:
      return state;
  }
};

export default courseInputsReducer;
