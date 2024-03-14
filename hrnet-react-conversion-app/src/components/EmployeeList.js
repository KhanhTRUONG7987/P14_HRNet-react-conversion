import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModalProvider, useModal } from 'react-modal-dk2/dist/lib/ModalContext/ModalContext.js';
import 'react-modal-dk2/dist/lib/Modal/Modal.css';
import ModalTrigger from 'react-modal-dk2/dist/lib/ModalTrigger/ModalTrigger.js';
import CreateEmployeeForm from './CreateEmployeeForm';
import { addEmployee, removeEmployee } from '../actions/employeeActions'; 
import '../styles/employeeList.css';
import logo from '../../public/images/logo.png';
import { useTable, useSortBy, usePagination } from 'react-table';
import { format, isValid } from 'date-fns'; 

const EmployeeList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const modalId = `modal-${Date.now()}`;
  const employees = useSelector((state) => state.employees.employees);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
        Cell: ({ value }) => {
          if (!value || !isValid(new Date(value))) return ''; 
          return format(new Date(value), 'MM/dd/yyyy');
        },
      },
      {
        Header: 'Department',
        accessor: 'department',
      },
      {
        Header: 'Date of Birth',
        accessor: 'birthday',
        Cell: ({ value }) => {
          if (!value || !isValid(new Date(value))) return '';
          return format(new Date(value), 'MM/dd/yyyy');
        },
      },
      {
        Header: 'Street',
        accessor: 'street',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'Zip Code',
        accessor: 'zip',
      },
      {
        Header: 'X',
        accessor: 'remove', 
        Cell: ({ row }) => (
          <button onClick={() => handleRemoveEmployee(row.original.id)}>X</button>
        )
      },
    ],
    []
  );
  

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
      columns,
      data: employees,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const handleRemoveEmployee = (employeeId) => {
    dispatch(removeEmployee(employeeId));
  };

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
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
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
          content={<CreateEmployeeForm modalId={modalId} saveEmployee={saveEmployee} />}
        ></ModalTrigger>
      </div>
    </ModalProvider>
  );
};

export default EmployeeList;
