import React, { useEffect, useState } from "react";
import {
  ModalProvider,
  useModal,
} from "react-modal-dk2/dist/lib/ModalContext/ModalContext.js";
import "react-modal-dk2/dist/lib/Modal/Modal.css";
import ModalTrigger from "react-modal-dk2/dist/lib/ModalTrigger/ModalTrigger.js";
import CreateEmployeeForm from "./CreateEmployeeForm";
import "../styles/employeeList.css";
import logo from "../../public/images/logo.png";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { closeModal } = useModal();
  const modalId = `modal-${Date.now()}`;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); 

  useEffect(() => {
    const storedEmployees =
      JSON.parse(localStorage.getItem("employeeData")) || [];
    const formattedEmployees = storedEmployees.map((employee) => ({
      ...employee,
      birthday: employee.birthday ? new Date(employee.birthday).toLocaleDateString() : '',
      startDate: employee.startDate ? new Date(employee.startDate).toLocaleDateString() : '',
    }));
    setEmployees(formattedEmployees);
  }, []);

  useEffect(() => {
    localStorage.setItem("employeeData", JSON.stringify(employees));
  }, [employees]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortKey || !a[sortKey] || !b[sortKey]) return 0; // Check if sort key or values are present
    if (sortOrder === "asc") {
      return a[sortKey].localeCompare(b[sortKey]);
    } else {
      return b[sortKey].localeCompare(a[sortKey]);
    }
  });
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const saveEmployee = (newEmployee, id) => {
    const formattedEmployee = {
      ...newEmployee,
      birthday: new Date(newEmployee.birthday).toLocaleDateString(),
      startDate: new Date(newEmployee.startDate).toLocaleDateString(),
    };

    const updatedEmployees = [...employees, formattedEmployee]; // Append the new employee to the existing list
    setEmployees(updatedEmployees); // Update the state with the new list
    localStorage.setItem("employeeData", JSON.stringify(updatedEmployees));
    closeModal(modalId); // Close the modal
  };

  return (
    <ModalProvider>
      <div className="container">
      <img src={logo} alt="Logo" className="logo" />
        <a href="/" className="home-link">
          Home
        </a>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search ..."
        />
        <h2>Current Employees</h2>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("firstName")}>
                First Name{" "}
                {sortKey === "firstName" && sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th onClick={() => handleSort("lastName")}>
                Last Name{" "}
                {sortKey === "lastName" && sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th onClick={() => handleSort("startDate")}>
                Start Date{" "}
                {sortKey === "startDate" && sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th onClick={() => handleSort("department")}>
                Department{" "}
                {sortKey === "department" && sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th onClick={() => handleSort("birthday")}>
                Date of Birth{" "}
                {sortKey === "birthday" && sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
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
        {/* Pagination */}
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(filteredEmployees.length / employeesPerPage) },
            (_, i) => (
              <li key={i} className={currentPage === i + 1 ? "active" : ""}>
                <button onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            )
          )}
        </ul>

        <ModalTrigger
          id={modalId}
          closeText="Close"
          closeTextClassName="close-button"
          modalClass="custom-modal"
          fadeDuration={300}
          fadeDelay={0.5}
          buttonText="Create employee"
          content={
            <CreateEmployeeForm modalId={modalId} saveEmployee={saveEmployee} />
          }
        ></ModalTrigger>
      </div>
    </ModalProvider>
  );
};

export default EmployeeList;
