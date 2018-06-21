import { combineReducers } from "redux";
import { reducer as tooltip } from "redux-tooltip"
import user from "./reducers/user";

export default combineReducers({
  user, tooltip
});
