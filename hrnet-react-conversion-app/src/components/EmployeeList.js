import React, { useEffect, useState } from "react";
import {
  ModalProvider,
  useModal,
} from "react-modal-dk2/dist/lib/ModalContext/ModalContext.js";
import "react-modal-dk2/dist/lib/Modal/Modal.css";
import ModalTrigger from "react-modal-dk2/dist/lib/ModalTrigger/ModalTrigger.js";
import CreateEmployeeForm from "./CreateEmployeeForm";
import "../styles/employeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    const storedEmployees =
      JSON.parse(localStorage.getItem("employeeData")) || [];
    setEmployees(storedEmployees);
  }, []);

  // Define the saveEmployee function to be passed to CreateEmployeeForm
  const saveEmployee = (newEmployee, id) => {
    const storedEmployees =
      JSON.parse(localStorage.getItem("employeeData")) || [];
    const updatedEmployees = [...storedEmployees, newEmployee];

    setEmployees(updatedEmployees);
    localStorage.setItem("employeeData", JSON.stringify(updatedEmployees));

    closeModal(id); 
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

        {/* Pass saveEmployee function to CreateEmployeeForm */}
        <ModalTrigger
          id={`modal-${Date.now()}`}
          closeText="Close"
          closeTextClassName="close-button"
          modalClass="custom-modal"
          fadeDuration={300}
          fadeDelay={0.5}
          buttonText="Create employee"
          content={
            <CreateEmployeeForm
              saveEmployee={(newEmployee, id) => saveEmployee(newEmployee, id)}
            />
          }
        ></ModalTrigger>
      </div>
    </ModalProvider>
  );
};

export default EmployeeList;
