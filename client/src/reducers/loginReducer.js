import { Change } from "../actions/selectors";

const initialState = {
  email: "",
  emailErr: "",
  password: "",
  passwordErr: "",
  errorMessage: "",
  routePath: "",
  busy: false,
};

const loginReducer = (state = initialState, action) => {
  const payload = action.payload;
  if (action.type === Change.Login) return { ...state, ...payload };

  return state;
};
export default loginReducer;
