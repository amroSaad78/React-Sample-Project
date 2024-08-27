export const Change = {
  Main: "changeMain",
  Login: "changeLogin",
  Redeem: "changeRedeem",
  Register: "changeRegister",
  Dashboard: "changeDashboard",
  UserInputs: "changeUserInputs",
  Verfication: "changeVerfication",
  CourseInputs: "changeCourseInputs",
  MessageInputs: "changeMessageInputs",
  SubCourseInputs: "changeSubCourseInputs",
  GroupMessage: "changeGroupMessage",
  AssignUsers: "changeAssignUsers",
  SubCourses: "changeSubCourses",
  SubCourse: "changeSubCourse",
  Courses: "changeCourses",
  Course: "changeCourse",
  Shared: "changeShared",
  Image: "changeImage",
  Users: "changeUsers",
  User: "changeUser",
};

export const Reset = {
  SubCourseInputs: "resetSubCourseInputs",
  MessageInputs: "resetMessageInputs",
  CourseInputs: "resetCourseInputs",
  GroupMessage: "resetGroupMessage",
  AllReducers: "resetAllReducers",
  AssignUsers: "resetAssignUsers",
  SubCourses: "resetSuubCourses",
  UserInputs: "resetUserInputs",
  SubCourse: "resetSubCourse",
  Courses: "resetCourses",
  Shared: "resetShared",
  Course: "resetCourse",
  Users: "resetUsers",
  Image: "resetImage",
  User: "resetUser",
};

export const LeftForm = {
  Verfication: "verfication",
  Login: "login",
  Redeem: "redeem",
};

export const RightForm = {
  Verfication: "verfication",
  Register: "register",
};

export const Steps = {
  User: {
    New: "newUser",
    Edit: "editUser",
    Image: "userImage",
  },
  Course: {
    New: "newCourse",
    Edit: "editCourse",
    Image: "courseImage",
  },
  SubCourse: {
    New: "newSubCourse",
    Edit: "editSubCourse",
    Assign: "assignSubCourse",
  },
};

export const MessageTypes = {
  None: "noMessage",
  Error: "errorMessage",
  Success: "successMessage",
};

export const StepsUserArray = Object.values(Steps.User);
export const StepsCourseArray = Object.values(Steps.Course);
export const StepsSubCourseArray = Object.values(Steps.SubCourse);
export const MessageTypesArray = Object.values(MessageTypes);
