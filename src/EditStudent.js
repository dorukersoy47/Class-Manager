import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
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
    level: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/getStudent/${id}`)
        .then(response => {
        const date = new Date(response.data.birthDate);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; 
        setStudent({...response.data, birthDate: formattedDate});
      })
      .catch(error => console.error(`There was an error retrieving the student: ${error}`));
  }, [id]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/editStudent/${id}`, student)
      .then(response => {
        alert('Student updated successfully');
        navigate('/database');
      })
      .catch(error => console.error(`There was an error updating the student: ${error}`));
  };

  return (
    <form className="studentForm" onSubmit={handleSubmit}>
        <h3>Demographic</h3>
        <label className="formLabel">
            Name:*
            <input className="formInput" type="text" name="name" value={student.name} onChange={handleChange} required />
        </label>
        <label className="formLabel">
            Surname:*
            <input className="formInput" type="text" name="surname" value={student.surname} onChange={handleChange} required />
        </label>
        <label className="formLabel">
            Parent One Name:
            <input className="formInput" type="text" name="parentOneName" value={student.parentOneName} onChange={handleChange} />
        </label>
        <label className="formLabel">
            Parent One Surname:
            <input className="formInput" type="text" name="parentOneSurname" value={student.parentOneSurname} onChange={handleChange} />
        </label>
        <label className="formLabel">
            Parent Two Name:
            <input className="formInput" type="text" name="parentTwoName" value={student.parentTwoName} onChange={handleChange} />
        </label>
        <label className="formLabel">
            Parent Two Surname:
            <input className="formInput" type="text" name="parentTwoSurname" value={student.parentTwoSurname} onChange={handleChange} />
        </label>
        <label className="formLabel">
            Birth Date:*
            <input className="formInput" type="date" name="birthDate" value={student.birthDate} onChange={handleChange} required />
        </label>
        <label className="formLabel">
            Address:*
            <input className="formInput" type="text" name="address" value={student.address} onChange={handleChange} required />
        </label>
        <label className="formLabel">
            Citizenship Number:*
            <input className="formInput" type="number" name="citizenshipNumber" value={student.citizenshipNumber} onChange={handleChange} required />
        </label>
        <label className="formLabel">
            Phone Number:*
            <input className="formInput" type="number" name="phoneNumber" value={student.phoneNumber} onChange={handleChange} required />
        </label>
        <h3>Education</h3>
        <label className="formLabel">
            Level:*
            <input className="formInput" type="number" name="level" value={student.level} onChange={handleChange} required />
        </label>
        <button className="submitButton" type="submit">Update Student</button>
    </form>
  );
}

export default EditStudent;
