import React, { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import {
  ModalProvider,
  useModal,
} from "react-modal-dk2/dist/lib/ModalContext/ModalContext.js";
import "react-modal-dk2/dist/lib/Modal/Modal.css";
import ModalTrigger from "react-modal-dk2/dist/lib/ModalTrigger/ModalTrigger.js";
import CreateEmployeeForm from "./CreateEmployeeForm";
import { addEmployee, removeEmployee } from "../actions/employeeActions";
import "../styles/employeeList.css";
import logo from "../../public/images/logo.png";
import { useTable, usePagination } from "react-table";
import { isValid } from "date-fns";

const EmployeeList = () => {
  useEffect(() => {
    document.title = "HRnet - Employee List"; 
  }, []);

  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const modalId = `modal-${Date.now()}`;
  const employees = useSelector((state) => state.employees.employees);

  // Memoized filtered employees based on search query and sorting
  const filteredEmployees = useMemo(() => {
    // Sort employees based on sorting state
    const sortedEmployees = [...employees].sort((a, b) => {
      if (sortKey) {
        if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    // Filter employees based on search query
    return sortedEmployees.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [employees, searchQuery, sortKey, sortOrder]);

  // Handler for search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handler for sorting change
  const handleSort = (key) => {
    const sortableColumns = [
      "firstName",
      "lastName",
      "startDate",
      "department",
      "birthday",
    ];
    if (sortableColumns.includes(key)) {
      if (key === sortKey) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setSortOrder("asc");
      }
    }
  };

  // Handler for removing an employee
  const handleRemoveEmployee = (employeeId) => {
    dispatch(removeEmployee(employeeId));
  };

  // Handler for saving a new employee
  const saveEmployee = (newEmployee) => {
    if (
      newEmployee &&
      isValid(new Date(newEmployee.birthday)) &&
      isValid(new Date(newEmployee.startDate))
    ) {
      const formattedEmployee = {
        ...newEmployee,
        birthday: new Date(newEmployee.birthday).toISOString(),
        startDate: new Date(newEmployee.startDate).toISOString(),
      };

      dispatch(addEmployee(formattedEmployee));
      closeModal(modalId);
    } else {
      console.error("Invalid new employee object:", newEmployee);
    }
  };

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Date of Birth",
        accessor: "birthday",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Street",
        accessor: "street",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "State",
        accessor: "state",
      },
      {
        Header: "Zip Code",
        accessor: "zip",
      },
      {
        Header: "X",
        accessor: "remove",
        Cell: ({ row }) => (
          <button onClick={() => handleRemoveEmployee(row.original.id)}>
            X
          </button>
        ),
      },
    ],
    []
  );

  // React-table hook for table functionality
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns: columns,
      data: filteredEmployees,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  // Render UI
  return (
    <ModalProvider>
      <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>HRnet - Employee List</title> 
        <meta name="description" content="List of Employees in HRnet" />
        <meta name="keywords" content="HRnet, employee, list, department" />
      </Helmet>
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
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    onClick={() => handleSort(column.id)} 
                    style={{ cursor: "pointer" }} 
                  >
                    <div>
                      {column.render("Header")}
                      {/* Conditionally render sorting symbols */}
                      {[
                        "firstName",
                        "lastName",
                        "startDate",
                        "department",
                        "birthday",
                      ].includes(column.id) &&
                        employees.length > 1 && (
                          <span className="sort-symbol">
                            {sortKey === column.id && sortOrder === "asc"
                              ? " ▲"
                              : " ▼"}
                          </span>
                        )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <ul className="pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
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
