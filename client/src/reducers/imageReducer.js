import { Change, Reset } from "../actions/selectors";

const initialState = {
  url: "",
  imgUrl: "",
  busy: false,
  progressValue: 0,
  callback: Function,
  imgFile: undefined,
};

const imageReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.Image:
      return { ...state, ...payload };
    case Reset.Image:
      return { ...initialState };
    default:
      return state;
  }
};
export default imageReducer;
