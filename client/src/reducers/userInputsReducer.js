import { Change, Reset } from "../actions/selectors";
import { Roles } from "../config/userRoles";

const initialState = {
  id: "",
  name: "",
  nameErr: "",
  email: "",
  emailErr: "",
  tel: "",
  telErr: "",
  identity: "",
  identityErr: "",
  password: "",
  passwordErr: "",
  confPass: "",
  confPassErr: "",
  errorMessage: "",
  role: Roles.Gust,
  roleErr: "",
  busy: false,
};

const userInputsReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.UserInputs:
      return { ...state, ...payload };
    case Reset.UserInputs:
      return { ...initialState };
    default:
      return state;
  }
};

export default userInputsReducer;
