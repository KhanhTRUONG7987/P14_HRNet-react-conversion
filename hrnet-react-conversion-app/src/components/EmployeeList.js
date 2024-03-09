import React, { useEffect, useState } from 'react';
import ModalTrigger from 'react-modal-kt/dist/lib/ModalTrigger/ModalTrigger.js';
import { useModal } from 'react-modal-kt/dist/lib/ModalContext/ModalContext.js';
import 'react-modal-kt/dist/lib/ModalManager/ModalManager.css';
import 'react-modal-kt/dist/lib/Modal/Modal.css';
import 'react-modal-kt/dist/lib/Overlay/Overlay.css';
import 'react-modal-kt/dist/lib/ModalTrigger/ModalTrigger.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTable } from 'react-table';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [startDate, setStartDate] = useState(new Date()); // state for datetime picker

    const { closeModal } = useModal();

    const closeModalOnEscape = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('keyup', closeModalOnEscape);

        return () => {
            document.removeEventListener('keyup', closeModalOnEscape);
        };
    }, []);

    // handle saving the employee
    const saveEmployee = () => {
        // ... logic
        closeModal(); // close modal after saving
    };

    // react-table configuration
    const columns = React.useMemo(
        () => [
            { Header: 'First Name', accessor: 'firstName' },
            { Header: 'Last Name', accessor: 'lastName' },
            { Header: 'Start Date', accessor: 'startDate' },
            { Header: 'Department', accessor: 'department' },
            { Header: 'Date of Birth', accessor: 'dateOfBirth' },
            { Header: 'Street', accessor: 'street' },
            { Header: 'City', accessor: 'city' },
            { Header: 'State', accessor: 'state' },
            { Header: 'Zip Code', accessor: 'zipCode' },
        ],
        []
    );

    const tableInstance = useTable({ columns, data: employees }); // using the useTable hook

    return (
        <div className="container">
            <h2>Current Employees</h2>
            {/* table rendering using react-table */}
            <table>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column.accessor}>{column.Header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.startDate}</td>
                            <td>{employee.department}</td>
                            <td>{employee.dateOfBirth}</td>
                            <td>{employee.street}</td>
                            <td>{employee.city}</td>
                            <td>{employee.state}</td>
                            <td>{employee.zipCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalTrigger
                closeText="Cancel"
                closeClass="custom-close-class"
                closeExisting={true}
                escapeClose={true}
                clickClose={true}
                modalClass="custom-modal"
                fadeDuration={300}
                fadeDelay={0.5}
                content={
                    <form onSubmit={saveEmployee}>
                        <h2>Create Employee</h2>
                        <label htmlFor="start-date">Start Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                        <input type="text" name="department" placeholder="Department" />
                        <input type="text" name="dateOfBirth" placeholder="Date of Birth" />
                        <input type="text" name="street" placeholder="Street" />
                        <input type="text" name="city" placeholder="City" />
                        <input type="text" name="state" placeholder="State" />
                        <input type="text" name="zipCode" placeholder="Zip Code" />
                        <button type="submit">Save</button>
                        <button onClick={closeModal}>Cancel</button>
                    </form>
                }
            />
            <a href="/">Home</a>
        </div>
    );
};

export default EmployeeList;
