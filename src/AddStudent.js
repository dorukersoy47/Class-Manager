import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: '',
        surname: '',
        parentOneName: '',
        parentOneSurname: '',
        parentTwoName: '',
        parentTwoSurname: '',
        birthDate: '',
        address: '',
        citizenshipNumber: '',
        phoneNumber: '',
        finance: [{
            title: '',
            description: '',
            value: ''
        }],
        level: ''
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }

    const handleFinanceChange = (e) => {
        const updatedFinance = {
            ...student.finance[0],
            [e.target.name]: e.target.value
        };
        setStudent({
            ...student,
            finance: [updatedFinance]
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/addStudent', student)
            .then(response => {
                alert('Student added successfully');
                navigate('/database');
            })
            .catch(error => console.error(`There was an error adding the student: ${error}`));
    }

    return (
        <form className="studentForm" onSubmit={handleSubmit}>
            <h3>Demographic</h3>
            <label className="formLabel">
                Name:*
                <input className="formInput" type="text" name="name" onChange={handleChange} required />
            </label>
            <label className="formLabel">
                Surname:*
                <input className="formInput" type="text" name="surname" onChange={handleChange} required />
            </label>
            <label className="formLabel">
                Parent One Name:
                <input className="formInput" type="text" name="parentOneName" onChange={handleChange} />
            </label>
            <label className="formLabel">
                Parent One Surname:
                <input className="formInput" type="text" name="parentOneSurname" onChange={handleChange} />
            </label>
            <label className="formLabel">
                Parent Two Name:
                <input className="formInput" type="text" name="parentTwoName" onChange={handleChange} />
            </label>
            <label className="formLabel">
                Parent Two Surname:
                <input className="formInput" type="text" name="parentTwoSurname" onChange={handleChange} />
            </label>
            <label className="formLabel">
                Birth Date:*
                <input className="formInput" type="date" name="birthDate" onChange={handleChange} required />
            </label>
            <label className="formLabel">
                Address:*
                <input className="formInput" type="text" name="address" onChange={handleChange} required />
            </label>
            <label className="formLabel">
                Citizenship Number:*
                <input className="formInput" type="number" name="citizenshipNumber" onChange={handleChange} required />
            </label>
            <label className="formLabel">
                Phone Number:*
                <input className="formInput" type="number" name="phoneNumber" placeholder="5..." onChange={handleChange} required />
            </label>
            <h3>Finance Information</h3>
            <label className="formLabel">
                Title:*
                <input className="formInput" type="text" name="title" onChange={handleFinanceChange} required />
            </label>
            <label className="formLabel">
                Description:
                <input className="formInput" type="text" name="description" onChange={handleFinanceChange} />
            </label>
            <label className="formLabel">
                Value:*
                <input className="formInput" type="number" name="value" onChange={handleFinanceChange} required/>
            </label>
            <h3>Education</h3>
            <label className="formLabel">
                Level:*
                <input className="formInput" type="number" name="level" onChange={handleChange} required />
            </label>
            <button className="submitButton" type="submit">Add Student</button>
        </form>
    );
}

export default AddStudent;