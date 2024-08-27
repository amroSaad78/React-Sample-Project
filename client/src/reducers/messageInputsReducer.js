import { Change, Reset } from "../actions/selectors";

const initialState = {
  receiverId: "",
  subjectErr: "",
  subject: "",
  details: "",
  title: "",
  url: "",
  id: "",
  busy: false,
};

const messageInputsReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.MessageInputs:
      return { ...state, ...payload };
    case Reset.MessageInputs:
      return { ...initialState };
    default:
      return state;
  }
};

export default messageInputsReducer;
