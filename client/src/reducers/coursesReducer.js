import { Change, Reset } from "../actions/selectors";

const initialState = {
  list: [],
  currentPage: -1,
  routePath: "",
  nextPage: 0,
  skip: 0,
  busy: false,
};

const coursesReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.Courses:
      return { ...state, ...payload };
    case Reset.Courses:
      return { ...initialState };
    default:
      return state;
  }
};

export default coursesReducer;
