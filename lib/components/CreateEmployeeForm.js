import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useModal } from "react-modal-dk2/dist/lib/ModalContext/ModalContext.js";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../actions/employeeActions";
import { useNavigate } from "react-router-dom";
import logo from "../../public/images/logo.png";
import { v4 as uuidv4 } from "uuid";

const zipRegex = /^\d{5}(?:-\d{4})?$/;

const CreateEmployeeForm = ({ modalId, saveEmployee }) => {
  useEffect(() => {
    document.title = "HRnet - Create Employee";
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal, closeAllModals } = useModal();

  const existingEmployees = useSelector((state) => state.employees.employees);

  const [employeeData, setEmployeeData] = useState({
    id: uuidv4(),
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

  const [errorMessage, setErrorMessage] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [zipError, setZipError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (field, date) => {
    const formattedDate = date.toISOString();
    setEmployeeData((prevState) => ({
      ...prevState,
      [field]: formattedDate,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for duplicate employee
    const isDuplicate = existingEmployees.some(
      (employee) =>
        employee.firstName === employeeData.firstName &&
        employee.lastName === employeeData.lastName &&
        new Date(employee.birthday).toDateString() ===
          new Date(employeeData.birthday).toDateString()
    );

    if (isDuplicate) {
      setErrorMessage(
        "Duplicate employee found. Please enter a unique employee."
      );
      return;
    } else {
      setErrorMessage("");
    }

    // Calculate age based on the selected birthday
    const birthDate = new Date(employeeData.birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // Check if the employee is at least 18 years old
    if (age < 18) {
      setBirthdayError("Employee must be at least 18 years old.");
      return;
    } else {
      setBirthdayError("");
    }

    // Validate the ZIP code format
    if (!zipRegex.test(employeeData.zip)) {
      setZipError("Invalid zip code format. Please enter a valid zip code.");
      return;
    } else {
      setZipError("");
    }

    // If all validations pass, proceed with saving the employee data
    const serializedEmployeeData = { ...employeeData };

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

      navigate("/employee-list");
    }
  };

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>HRnet - Create Employee</title>
        <meta name="description" content="Create Employee Form for HRnet" />
        <meta
          name="keywords"
          content="HRnet, employee, create, form, firstName, lastName, birthday, startDate, street, city, state, zip, department"
        />
      </Helmet>
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
            maxDate={new Date()}
            required
          />
          {birthdayError && <p style={{ color: "red" }}>{birthdayError}</p>}{" "}
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
          {zipError && <p style={{ color: "red" }}>{zipError}</p>}
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

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button className="save-button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
