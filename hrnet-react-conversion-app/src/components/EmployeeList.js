import React, { useEffect, useState } from 'react';
import Modal from 'react-custom-modal-khanh';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTable } from 'react-table';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date()); // state for datetime picker

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    // handle saving the employee
    const saveEmployee = () => {
        // ... logic
        setIsModalOpen(false); // close modal after saving
    };

    // react-table configuration
    const columns = React.useMemo(
        () => [
            { Header: 'First Name', accessor: 'firstName' },
            { Header: 'Last Name', accessor: 'lastName' },
            // other columns...
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
                    {tableInstance.headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {tableInstance.rows.map(row => {
                        tableInstance.prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <h2>Create Employee</h2>
                <form onSubmit={saveEmployee}>
                    {/* form inputs */}
                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                    />
                    {/* other inputs... */}
                    <button type="submit">Save</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </form>
            </Modal>
            <a href="/">Home</a>
        </div>
    );
};

export default EmployeeList;