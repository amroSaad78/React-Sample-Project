import { Change } from "../actions/selectors";
import { Roles } from "../config/userRoles";
const initialState = {
  imageURL: "images/user.png",
  userRole: Roles.Gust,
  newMessages: 0,
  routePath: "",
  busy: false,
};

const dashboardReducer = (state = initialState, action) => {
  const payload = action.payload;
  if (action.type === Change.Dashboard) return { ...state, ...payload };

  return state;
};

export default dashboardReducer;
