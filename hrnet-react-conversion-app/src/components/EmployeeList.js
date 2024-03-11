// EmployeeList.js
import React, { useEffect, useState } from "react";
import {
  ModalProvider,
  useModal,
} from "react-modal-dkt/dist/lib/ModalContext/ModalContext.js";
import "react-modal-dkt/dist/lib/Modal/Modal.css";
import ModalTrigger from "react-modal-dkt/dist/lib/ModalTrigger/ModalTrigger.js";
import CreateEmployeeForm from "./CreateEmployeeForm";
import "../styles/employeeList.css";

const ModalContent = ({ children }) => {
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click event from propagating to parent (modal)
  };

  return (
    <div className="modal" onClick={handleClick}>
      {children}
    </div>
  );
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    const storedEmployees =
      JSON.parse(localStorage.getItem("employeeData")) || [];
    const formattedEmployees = storedEmployees.map((employee) => ({
      ...employee,
      startDate: Date.parse(employee.startDate), // Convert startDate to integer
      birthday: Date.parse(employee.birthday), // Convert birthday to integer
    }));
    console.log(formattedEmployees);
    setEmployees(formattedEmployees);
  }, []);

  const saveEmployee = (newEmployee) => {
    // Check if the employee already exists
    const employeeExists = employees.some(
      (employee) =>
        employee.firstName === newEmployee.firstName &&
        employee.lastName === newEmployee.lastName &&
        employee.birthday === newEmployee.birthday
    );

    console.log("Employee exists:", employeeExists);

    if (employeeExists) {
      alert("Employee already exists!");
      return; // Exit function if employee already exists
    }

    console.log("Adding new employee:", newEmployee);

    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    localStorage.setItem(
      "employeeData",
      JSON.stringify([...employees, newEmployee])
    );
    closeModal();
  };

  return (
    <ModalProvider>
      <div className="container">
        <h2>Current Employees</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Start Date</th>
              <th>Department</th>
              <th>Date of Birth</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{new Date(employee.startDate).toLocaleDateString()}</td>
                <td>{employee.department}</td>
                <td>{new Date(employee.birthday).toLocaleDateString()}</td>
                <td>{employee.address.street}</td>
                <td>{employee.address.city}</td>
                <td>{employee.address.state}</td>
                <td>{employee.address.zip}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <ModalTrigger
          closeText="Close"
          modalClass="custom-modal"
          fadeDuration={300}
          fadeDelay={0.5}
          clickClose={false}
          content={<CreateEmployeeForm saveEmployee={saveEmployee} closeModal={closeModal} />}
        >
          <button>Create Employee</button>
        </ModalTrigger>

        <a href="/">Home</a>
      </div>
    </ModalProvider>
  );
};

export default EmployeeList;
