import React, { useEffect, useState } from 'react';
import { useReactTable } from '@tanstack/react-table';

import Modal from 'react-custom-modal-khanh';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const table = useReactTable(options);

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    return (
        <div className="container">
            <h2>Current Employees</h2>
            <ReactTable
                data={employees}
                columns={[
                    { Header: 'First Name', accessor: 'firstName' },
                    { Header: 'Last Name', accessor: 'lastName' },
                    // other columns
                ]}
            />
            <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {/* Modal content */}
                <p>This is a modal</p>
            </Modal>
            <a href="/">Home</a>
        </div>
    );
}

export default EmployeeList;
