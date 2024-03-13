import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useModal } from "react-modal-dk2/dist/lib/ModalContext/ModalContext.js";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../actions/employeeActions";
import { useNavigate } from "react-router-dom";
import logo from "../../public/images/logo.png";

const CreateEmployeeForm = ({ modalId, saveEmployee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees.employees);
  const { closeModal, closeAllModals } = useModal();

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
  const [zipError, setZipError] = useState(""); // State to store zip code error message

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Regular expression to match the desired zip code format (e.g., 12345 or 12345-6789)
    const zipRegex = /^\d{5}(?:-\d{4})?$/;
  
    // Check if the entered zip code matches the desired format
    if (name === "zip" && !zipRegex.test(value)) {
      // If the zip code format is incorrect, set the error message
      setZipError("Invalid zip code format. Please enter a valid zip code.");
    } else {
      // Clear the error message if the zip code format is valid
      setZipError("");
  
      setEmployeeData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };  

  const handleDateChange = (field, date) => {
    setEmployeeData((prevState) => ({
      ...prevState,
      [field]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is a zip code error, prevent form submission
    if (zipError) {
      return;
    }

    const serializedEmployeeData = {
      ...employeeData,
      birthday: employeeData.birthday.toISOString(),
      startDate: employeeData.startDate.toISOString(),
    };

    if (saveEmployee) {
      // Call the saveEmployee function from EmployeeList.js
      saveEmployee(serializedEmployeeData);
      if (modalId) {
        closeModal(modalId);
      } else {
        closeAllModals();
      }
    } else {
      // Dispatch the action to add an employee
      dispatch(addEmployee(serializedEmployeeData));
      // Store the data in local storage
      const updatedEmployees = [...employees, serializedEmployeeData];
      localStorage.setItem("employeeData", JSON.stringify(updatedEmployees));
      // Navigate to the EmployeeList page
      navigate("/employee-list");
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
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
            dateFormat="MM/dd/yyyy"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            selected={employeeData.startDate}
            onChange={(date) => handleDateChange("startDate", date)}
            className="date-picker"
            dateFormat="MM/dd/yyyy"
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
          {zipError && <p className="error-message">{zipError}</p>}
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
