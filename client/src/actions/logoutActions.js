import { config } from "../config/configurations";
import { Reset } from "./selectors";

export function logout() {
  localStorage.removeItem(config.TOKEN_NAME);
  localStorage.removeItem("course");
  return { type: Reset.AllReducers };
}
