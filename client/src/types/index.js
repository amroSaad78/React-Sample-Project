import { array, number, string, func, object, bool, oneOf } from "prop-types";
import { RolesArray } from "../config/userRoles";
import {
  StepsUserArray,
  StepsCourseArray,
  MessageTypesArray,
  StepsSubCourseArray,
} from "../actions/selectors";

const busy = { busy: bool.isRequired };
const onSubmit = { ...busy, onSubmit: func.isRequired };
const onChange = { ...onSubmit, onChange: func.isRequired };
const logRegShared = {
  ...onChange,
  onSuccess: func.isRequired,
  onFailure: func.isRequired,
  email: string.isRequired,
  emailErr: string.isRequired,
  password: string.isRequired,
  passwordErr: string.isRequired,
  errorMessage: string.isRequired,
  routePath: string.isRequired,
};

export const mainType = {
  rightForm: string.isRequired,
  leftForm: string.isRequired,
};

export const logInType = {
  ...logRegShared,
  redeemPassword: func.isRequired,
};

export const registerType = {
  ...logRegShared,
  name: string.isRequired,
  nameErr: string.isRequired,
  confPass: string.isRequired,
  confPassErr: string.isRequired,
};

export const redeemType = {
  ...onChange,
  goBack: func.isRequired,
  email: string.isRequired,
  emailErr: string.isRequired,
  errorMessage: string.isRequired,
  infoMessage: string.isRequired,
};

export const verficationType = {
  ...onChange,
  codeRequest: func.isRequired,
  email: string.isRequired,
  code: string.isRequired,
  codeErr: string.isRequired,
  infoMessage: string.isRequired,
  errorMessage: string.isRequired,
  verficationPath: string.isRequired,
  codeRequestPath: string.isRequired,
  routePath: string.isRequired,
};
export const dashboardType = {
  ...busy,
  callback: func.isRequired,
  closeConfirmation: func.isRequired,
  getUserBasicData: func.isRequired,
  resetToast: func.isRequired,
  imageURL: string.isRequired,
  userRole: oneOf(RolesArray),
  routePath: string.isRequired,
  newMessages: number.isRequired,
  messageBody: string.isRequired,
  messageType: oneOf(MessageTypesArray),
  showConfirmation: bool.isRequired,
};

export const imageType = {
  ...onSubmit,
  updateProgress: func.isRequired,
  onUnmount: func.isRequired,
  setImage: func.isRequired,
  onDelete: func.isRequired,
  callback: func.isRequired,
  imgFile: object,
  url: string.isRequired,
  imgUrl: string.isRequired,
  progressValue: number.isRequired,
};

export const inputsType = {
  ...onChange,
  onUnmount: func.isRequired,
  onContinue: func.isRequired,
  newEntry: func.isRequired,
  onSave: func.isRequired,
  id: string.isRequired,
};

export const userInputsType = {
  ...inputsType,
  email: string.isRequired,
  emailErr: string.isRequired,
  name: string.isRequired,
  nameErr: string.isRequired,
  tel: string.isRequired,
  telErr: string.isRequired,
  identity: string.isRequired,
  identityErr: string.isRequired,
  password: string.isRequired,
  passwordErr: string.isRequired,
  confPass: string.isRequired,
  confPassErr: string.isRequired,
  role: oneOf(RolesArray).isRequired,
  roleErr: string.isRequired,
};

export const userType = {
  onUnmount: func.isRequired,
  state: oneOf(StepsUserArray).isRequired,
};

export const listType = {
  ...busy,
  confirmDeletion: func.isRequired,
  scrolling: func.isRequired,
  onUnmount: func.isRequired,
  edit: func.isRequired,
  del: func.isRequired,
  get: func.isRequired,
  list: array.isRequired,
  skip: number.isRequired,
  nextPage: number.isRequired,
  routePath: string.isRequired,
  currentPage: number.isRequired,
};

export const userListType = {
  ...listType,
  toggle: func.isRequired,
  sendMessage: func.isRequired,
  leazyLoading: func.isRequired,
};

export const courseListType = {
  ...listType,
  add: func.isRequired,
  leazyLoading: func.isRequired,
  listSubCourses: func.isRequired,
};

export const subCourseListType = {
  ...listType,
  toggle: func.isRequired,
  reload: func.isRequired,
  sendMessage: func.isRequired,
  courseId: string.isRequired,
  name: string.isRequired,
};

export const assignUserslistType = {
  ...busy,
  leazyLoading: func.isRequired,
  scrolling: func.isRequired,
  toggle: func.isRequired,
  reset: func.isRequired,
  get: func.isRequired,
  list: array.isRequired,
  nextPage: number.isRequired,
  subCourseId: string.isRequired,
  currentPage: number.isRequired,
};

export const courseInputsType = {
  ...inputsType,
  name: string.isRequired,
  nameErr: string.isRequired,
  details: string.isRequired,
};

export const subCourseInputsType = {
  ...inputsType,
  toggle: func.isRequired,
  reload: func.isRequired,
  name: string,
  hours: string.isRequired,
  hoursErr: string.isRequired,
  price: string.isRequired,
  priceErr: string.isRequired,
  isActive: bool.isRequired,
  courseId: string,
  startDate: string.isRequired,
  startDateErr: string.isRequired,
};

export const courseType = {
  onUnmount: func.isRequired,
  state: oneOf(StepsCourseArray).isRequired,
};

export const subCourseType = {
  onUnmount: func.isRequired,
  reload: func.isRequired,
  url: string.isRequired,
  state: oneOf(StepsSubCourseArray).isRequired,
};

export const messageType = {
  ...onChange,
  reload: func.isRequired,
  reset: func.isRequired,
  onUnmount: func.isRequired,
  subjectErr: string.isRequired,
  details: string.isRequired,
  subject: string.isRequired,
  title: string.isRequired,
};

export const messageInputsType = {
  ...messageType,
  receiverId: string.isRequired,
  id: string.isRequired,
};

export const groupMessageType = {
  ...messageType,
  subCourseId: string.isRequired,
};
