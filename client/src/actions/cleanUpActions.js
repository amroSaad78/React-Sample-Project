import { Reset } from "./selectors";

export function cleanUp() {
  return { type: Reset.AllReducers };
}
