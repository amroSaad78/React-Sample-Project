import { VerficationMessage } from "../constants/messages";
import { Change } from "../actions/selectors";

const initialState = {
  email: "",
  code: "",
  codeErr: "",
  routePath: "",
  errorMessage: "",
  verficationPath: "",
  codeRequestPath: "",
  infoMessage: VerficationMessage,
  busy: false,
};

const verficationReducer = (state = initialState, action) => {
  const payload = action.payload;
  if (action.type === Change.Verfication) return { ...state, ...payload };
  return state;
};

export default verficationReducer;
