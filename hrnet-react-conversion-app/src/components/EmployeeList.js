import React, { useEffect, useState } from 'react';
// import ModalTrigger from 'react-modal-kt/lib/ModalTrigger';
// import { useModal } from 'react-modal-kt/lib/ModalContext';
// import 'react-modal-kt/lib/ModalManager/ModalManager.css';
// import 'react-modal-kt/lib/Modal/Modal.css';
// import 'react-modal-kt/lib/Overlay/Overlay.css';
// import 'react-modal-kt/lib/ModalTrigger/ModalTrigger.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTable } from 'react-table';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [startDate, setStartDate] = useState(new Date()); // state for datetime picker

    //const { closeModal } = useModal();

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
            {/* <ModalTrigger
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
            /> */}
            <a href="/">Home</a>
        </div>
    );
};

export default EmployeeList;
