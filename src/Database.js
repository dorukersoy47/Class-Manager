import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import FinanceImage from './images/Finance.svg';
import LevelImage from './images/Level.svg';
import DeleteImage from './images/Delete.svg';

const Database = () => {

    const [students, setStudents] = useState([]);
    const [searchField, setSearchField] = useState('name');
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/getStudents')
            .then(users => setStudents(users.data))
            .catch(err => console.log(err))
    }, []);

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this student?")){
            axios.delete(`http://localhost:3001/deleteStudent/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        setStudents(students.filter(student => student._id !== id));
                    }
                })
                .catch(err => console.log(err))
        }
    };

    return (
        <div className="studentDb">
            <div className="addStudent">
                <a className="addStudentP" href="./add">Add Student</a>
            </div>
            <div className="searchBar">
                <div className="searchField">
                    <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="surname">Surname</option>
                        <option value="birthDate">Birth Date</option>
                        <option value="address">Address</option>
                        <option value="citizenshipNumber">Citizenship Number</option>
                        <option value="phoneNumber">Phone Number</option>
                        <option value="parentOneName">Parent #1 Name</option>
                        <option value="parentOneSurname">Parent #1 Surname</option>
                        <option value="parentTwoName">Parent #2 Name</option>
                        <option value="parentTwoSurname">Parent #2 Surname</option>
                    </select>
                </div>
                <div className="searchInput">
                    <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Search..."/>
                </div>
            </div>
            <table className="studentDbTable">
                <thead>
                    <tr>
                        <th>Person</th>
                        <th>Birth Date</th>
                        <th>Address</th>
                        <th>Citizenship Number</th>
                        <th>Phone Number</th>
                        <th>Parent #1</th>
                        <th>Parent #2</th>
                        <th>Finance</th>
                        <th>Level</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {
                    students.map(student => {
                        return <tr key={student._id}>
                            <td>{student.name || ""} {student.surname || ""}</td>
                            <td>{student.birthDate ? new Date(student.birthDate).toLocaleDateString('en-GB') : ""}</td>
                            <td>{student.address || ""}</td>
                            <td>{student.citizenshipNumber || ""}</td>
                            <td>{student.phoneNumber || ""}</td>
                            <td>{student.parentOneName || ""} {student.parentOneSurname || ""}</td>
                            <td>{student.parentTwoName || ""} {student.parentTwoSurname || ""}</td>
                            <td><a href={`/finance/${student._id}`}> <img src={FinanceImage} alt="Finance SVG"/></a></td>
                            <td><a href={`/level/${student._id}`}> <img src={LevelImage} alt="Level SVG" /></a></td>
                            <td><img src={DeleteImage} alt="Delete SVG" onClick={() => handleDelete(student._id)}/></td>
                        </tr>
                    })                    
                }
            </tbody>
            </table>
        </div>
    );
}

export default Database;
