import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../login/LoginSlice";
import {profileReducer,masterReducer,userReducer,companyReducer,customerReducer} from "../home/Slice"

const rootReducer = combineReducers({
  auth : authReducer,
  master : masterReducer,
  profile :  profileReducer,
  user  :   userReducer,
  company  :   companyReducer,
  customer : customerReducer,
});

const Store = configureStore({
  reducer : rootReducer,
});

export default Store;