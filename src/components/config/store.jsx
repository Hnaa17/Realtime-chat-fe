import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducer/Root";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;