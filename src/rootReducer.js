import { combineReducers } from "redux";
import user from "./reducers/user";
import formErrors from './reducers/formErrors';
export default combineReducers({
  user, formErrors
});
