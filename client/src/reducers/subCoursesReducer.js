import { Change, Reset } from "../actions/selectors";

const initialState = {
  list: [],
  courseId: "",
  name: "",
  currentPage: -1,
  routePath: "",
  nextPage: 0,
  skip: 0,
  busy: false,
};

const subCoursesReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.SubCourses:
      return { ...state, ...payload };
    case Reset.SubCourses:
      return { ...initialState };
    default:
      return state;
  }
};

export default subCoursesReducer;
