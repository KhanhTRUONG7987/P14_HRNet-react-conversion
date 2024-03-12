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

  useEffect(() => {
    const storedEmployees =
      JSON.parse(localStorage.getItem("employeeData")) || [];
    setEmployees(storedEmployees);
  }, []);

  const { closeModal } = useModal();

  const saveEmployee = (newEmployee) => {
    const storedEmployees =
      JSON.parse(localStorage.getItem("employeeData")) || [];
    const updatedEmployees = [...storedEmployees, newEmployee];

    setEmployees(updatedEmployees);
    localStorage.setItem("employeeData", JSON.stringify(updatedEmployees));

    closeModal(); // Close the modal after saving the employee
  };

  return (
    <ModalProvider>
      <div className="container">
        <a href="/" className="home-link">
          Home
        </a>
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
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.startDate}</td>
                <td>{employee.department}</td>
                <td>{employee.birthday}</td>
                <td>{employee.street}</td>
                <td>{employee.city}</td>
                <td>{employee.state}</td>
                <td>{employee.zip}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <ModalTrigger
          closeText="Close"
          closeTextClassName="close-button"
          modalClass="custom-modal"
          fadeDuration={300}
          fadeDelay={0.5}
          content={
            <ModalContent>
              <CreateEmployeeForm
                saveEmployee={saveEmployee}
                closeModal={closeModal}
              />
            </ModalContent>
          }
        >
          <button>Create Employee</button>
        </ModalTrigger>
      </div>
    </ModalProvider>
  );
};

export default EmployeeList;
