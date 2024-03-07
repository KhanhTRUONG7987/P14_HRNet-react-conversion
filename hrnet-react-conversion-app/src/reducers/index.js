// src/reducers/index.js
import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
  employees: employeeReducer,
});

export default rootReducer;
