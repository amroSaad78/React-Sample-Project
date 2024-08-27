import subCourseInputsReducer from "./subCourseInputsReducer";
import messageInputsReducer from "./messageInputsReducer";
import courseInputsReducer from "./courseInputsReducer";
import groupMessageReducer from "./groupMessageReducer";
import assignUsersReducer from "./assignUsersReducer";
import verficationReducer from "./verficationReducer";
import userInputsReducer from "./userInputsReducer";
import subCoursesReducer from "./subCoursesReducer";
import dashboardReducer from "./dashboardReducer";
import subCourseReducer from "./subCourseReducer";
import registerReducer from "./registerReducer";
import coursesReducer from "./coursesReducer";
import { Reset } from "../actions/selectors";
import courseReducer from "./courseReducer";
import redeemReducer from "./redeemReducer";
import sharedReducer from "./sharedReducer";
import loginReducer from "./loginReducer";
import imageReducer from "./imageReducer";
import usersReducer from "./usersReducer";
import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import userReducer from "./userReducer";

const appReducer = combineReducers({
  main: mainReducer,
  login: loginReducer,
  redeem: redeemReducer,
  register: registerReducer,
  verfication: verficationReducer,
  courseInputs: courseInputsReducer,
  messageInputs: messageInputsReducer,
  subCourseInputs: subCourseInputsReducer,
  groupMessage: groupMessageReducer,
  assignUsers: assignUsersReducer,
  subCourses: subCoursesReducer,
  userInputs: userInputsReducer,
  subCourse: subCourseReducer,
  dashboard: dashboardReducer,
  courses: coursesReducer,
  course: courseReducer,
  shared: sharedReducer,
  image: imageReducer,
  users: usersReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === Reset.AllReducers) {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
