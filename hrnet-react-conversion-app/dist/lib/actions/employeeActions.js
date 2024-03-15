// src/actions/employeeActions.js

export const addEmployee = (employee) => {
  console.log('Dispatching addEmployee action with payload:', employee); 
  return {
    type: "ADD_EMPLOYEE",
    payload: employee,
  };
};

export const removeEmployee = (employeeId) => ({
  type: "REMOVE_EMPLOYEE",
  payload: employeeId,
});