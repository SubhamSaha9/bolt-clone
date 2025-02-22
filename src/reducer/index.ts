import { combineReducers } from "@reduxjs/toolkit"
import messageReducer from "../slice/messageSlice";
import authReducer from "../slice/authSlice";
import actionReducer from "../slice/actionSlice";

const rootReducer = combineReducers({
    message: messageReducer,
    auth: authReducer,
    action: actionReducer,
});

export default rootReducer;