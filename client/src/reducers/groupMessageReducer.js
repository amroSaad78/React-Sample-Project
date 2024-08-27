import { Change, Reset } from "../actions/selectors";

const initialState = {
  subCourseId: "",
  subjectErr: "",
  subject: "",
  details: "",
  title: "",
  busy: false,
};

const groupMessageReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.GroupMessage:
      return { ...state, ...payload };
    case Reset.GroupMessage:
      return { ...initialState };
    default:
      return state;
  }
};

export default groupMessageReducer;
