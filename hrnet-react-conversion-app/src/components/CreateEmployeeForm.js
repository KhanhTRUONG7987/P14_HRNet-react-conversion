import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../styles/createEmployeeForm.css';
import { useModal } from 'react-modal-dkt/dist/lib/ModalContext/ModalContext';

const CreateEmployeeForm = ({ saveEmployee }) => {
    const { closeModal } = useModal();
    const [employeeData, setEmployeeData] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        startDate: "",
        address: {
            street: "",
            city: "",
            state: "",
            zip: "",
        },
        department: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setEmployeeData(prevState => ({
                ...prevState,
                [parent]: {
                    ...prevState[parent],
                    [child]: value
                }
            }));
        } else {
            setEmployeeData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleBirthdayChange = (newDateTime) => {
        setEmployeeData({
            ...employeeData,
            birthday: newDateTime,
        });
    };

    const handleStartDateChange = (newDateTime) => {
        setEmployeeData({
            ...employeeData,
            startDate: newDateTime,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        console.log("Employee data:", employeeData);
        console.log("Save employee function:", saveEmployee);
        saveEmployee(employeeData);
        closeModal();
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="container" onClick={stopPropagation}>
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
                        required={true}
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
                        required={true}
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="birthday">Date of Birth</label>
                    <DatePicker
                        selected={employeeData.birthday}
                        onChange={handleBirthdayChange}
                        className="date-picker"
                        required={true}
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker
                        selected={employeeData.startDate}
                        onChange={handleStartDateChange}
                        className="date-picker"
                        required={true}
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        value={employeeData.address.street}
                        onChange={handleChange}
                        name="address.street"
                        required={true}
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        value={employeeData.address.city}
                        onChange={handleChange}
                        name="address.city"
                        required={true}
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        value={employeeData.address.state}
                        onChange={handleChange}
                        name="address.state"
                        required={true}
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="zip">Zip Code</label>
                    <input
                        type="text"
                        id="zip"
                        value={employeeData.address.zip}
                        onChange={handleChange}
                        name="address.zip"
                        required={true}
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="department">Department</label>
                    <Dropdown
                        className='department'
                        options={['HR', 'Finance', 'Marketing']}
                        value={employeeData.department}
                        onChange={(option) => setEmployeeData(prevState => ({
                            ...prevState,
                            department: option.value
                        }))}
                        placeholder="Select an option"
                    />
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default CreateEmployeeForm;
