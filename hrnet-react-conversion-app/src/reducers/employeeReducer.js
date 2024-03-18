/* eslint-disable no-case-declarations */
// src/reducers/employeeReducer.js

const getInitialEmployees = () => {
  const storedEmployees =
    JSON.parse(localStorage.getItem("employeeData")) || [];
  const formattedEmployees = storedEmployees.map((employee) => ({
    ...employee,
    birthday: employee.birthday,
    startDate: employee.startDate,
  }));
  return formattedEmployees;
};

const initialState = {
  employees: getInitialEmployees(),
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      const updatedEmployeesAdd = [...state.employees, action.payload];
      localStorage.setItem("employeeData", JSON.stringify(updatedEmployeesAdd));
      return {
        ...state,
        employees: updatedEmployeesAdd,
      };
    case "REMOVE_EMPLOYEE":
      const updatedEmployeesRemove = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
      localStorage.setItem(
        "employeeData",
        JSON.stringify(updatedEmployeesRemove)
      );
      return {
        ...state,
        employees: updatedEmployeesRemove,
      };
    default:
      return state;
  }
};

export default employeeReducer;
