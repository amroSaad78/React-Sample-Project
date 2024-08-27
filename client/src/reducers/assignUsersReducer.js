import { Change, Reset } from "../actions/selectors";

const initialState = {
  list: [],
  subCourseId: "",
  currentPage: -1,
  nextPage: 0,
  busy: false,
};

const assignUsersReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.AssignUsers:
      return { ...state, ...payload };
    case Reset.AssignUsers:
      return { ...initialState, subCourseId: payload.subCourseId };
    default:
      return state;
  }
};

export default assignUsersReducer;
