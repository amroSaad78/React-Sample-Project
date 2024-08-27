import { Change, Reset } from "../actions/selectors";
const moment = require("moment");

const initialState = {
  id: "",
  name: "",
  hours: "",
  price: "",
  hoursErr: "",
  priceErr: "",
  courseId: "",
  startDateErr: "",
  startDate: moment(new Date()).format("YYYY-MM-DD"),
  isActive: false,
  busy: false,
};

const subCourseInputsReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.SubCourseInputs:
      return { ...state, ...payload };
    case Reset.SubCourseInputs:
      return {
        ...initialState,
        courseId: payload.courseId,
        name: payload.name,
      };
    default:
      return state;
  }
};

export default subCourseInputsReducer;
