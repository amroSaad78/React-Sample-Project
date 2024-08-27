import { Change, Reset, MessageTypes } from "../actions/selectors";

const initialState = {
  messageType: MessageTypes.None,
  showConfirmation: false,
  callback: Function,
  messageBody: "",
};

const sharedReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.Shared:
      return { ...state, ...payload };
    case Reset.Shared:
      return { ...initialState };
    default:
      return state;
  }
};

export default sharedReducer;
