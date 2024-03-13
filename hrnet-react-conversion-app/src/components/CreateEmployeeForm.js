import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../actions/employeeActions";
import { useNavigate } from "react-router-dom";

const CreateEmployeeForm = ({ saveEmployee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees.employees);

  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    birthday: null,
    startDate: null,
    street: "",
    city: "",
    state: "",
    zip: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (field, date) => {
    setEmployeeData((prevState) => ({
      ...prevState,
      [field]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serializedEmployeeData = {
      ...employeeData,
      birthday: employeeData.birthday.toISOString(),
      startDate: employeeData.startDate.toISOString(),
    };

    // Dispatch the action to add an employee
    dispatch(addEmployee(serializedEmployeeData));

    // Call the saveEmployee function from EmployeeList.js
    saveEmployee(serializedEmployeeData);

    // Store the data in local storage
    const updatedEmployees = [...employees, serializedEmployeeData];
    localStorage.setItem("employeeData", JSON.stringify(updatedEmployees));

    // Navigate to the EmployeeList page
    navigate("/employee-list");
  };

  return (
    <div className="container">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={employeeData.firstName}
            onChange={handleChange}
            name="firstName"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={employeeData.lastName}
            onChange={handleChange}
            name="lastName"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="birthday">Date of Birth</label>
          <DatePicker
            selected={employeeData.birthday}
            onChange={(date) => handleDateChange("birthday", date)}
            className="date-picker"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            selected={employeeData.startDate}
            onChange={(date) => handleDateChange("startDate", date)}
            className="date-picker"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={employeeData.street}
            onChange={handleChange}
            name="street"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={employeeData.city}
            onChange={handleChange}
            name="city"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={employeeData.state}
            onChange={handleChange}
            name="state"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            id="zip"
            value={employeeData.zip}
            onChange={handleChange}
            name="zip"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="department">Department</label>
          <Dropdown
            className="department"
            options={["HR", "Finance", "Marketing"]}
            value={employeeData.department}
            onChange={(option) =>
              setEmployeeData((prevState) => ({
                ...prevState,
                department: option.value,
              }))
            }
            placeholder="Select an option"
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
