import { Change, Reset, Steps } from "../actions/selectors";

const initialState = {
  state: Steps.SubCourse.New,
  url: "",
};

const subCourseReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.SubCourse:
      return { ...state, ...payload };
    case Reset.SubCourse:
      return { ...initialState };
    default:
      return state;
  }
};

export default subCourseReducer;
