// src/actions/employeeActions.js
export const addEmployee = employee => ({
    type: 'ADD_EMPLOYEE',
    payload: employee,
  });
  
  export const removeEmployee = employeeId => ({
    type: 'REMOVE_EMPLOYEE',
    payload: employeeId,
  });
  