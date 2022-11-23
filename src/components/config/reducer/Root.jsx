import { combineReducers } from "@reduxjs/toolkit";
import { usersReducers } from "./Users";
import { groupReducer } from "./Grup";

const rootReducer = combineReducers({
  users: usersReducers,
  group: groupReducer,
});

export default rootReducer;