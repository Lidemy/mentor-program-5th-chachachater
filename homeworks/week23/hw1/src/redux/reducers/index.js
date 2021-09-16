import { combineReducers } from "redux";
import todosReducer from "./todos";
import filtersReducer from "./filter";

export default combineReducers({
  todoState: todosReducer,
  filterState: filtersReducer,
});
