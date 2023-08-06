import React from 'react';
import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FinanceImage from './images/Finance.svg';
import EducationImage from './images/Education.svg';
import DeleteImage from './images/Delete.svg';
import EditImage from './images/Edit.svg';
import LessonImage from './images/Lesson.svg';

const Database = () => {

    const [students, setStudents] = useState([]);
    const [searchField, setSearchField] = useState('name');
    const [searchString, setSearchString] = useState('');

    const HighlightedText = ({ text = "", highlight = "" }) => {
        if (!highlight.trim()) {
            return <span>{text}</span>;
        }
        const regex = new RegExp(`(${highlight})`, "gi");
        const parts = text.split(regex);

        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={index} style={{ backgroundColor: "yellow" }}>
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    useEffect(() => {
        axios.get('http://localhost:3001/getStudents')
            .then(users => setStudents(users.data))
            .catch(err => console.log(err))
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            axios.delete(`http://localhost:3001/deleteStudent/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        setStudents(students.filter(student => student._id !== id));
                    }
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    };

    return (
        <div className="studentDb">
            <div className="addElement">
                <a className="add" href="./add">Add Student</a>
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
                    <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Search..." />
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
                        <th>Lessons</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {
                    students.filter(student => {
                        if (searchString === "") {
                            return student
                        } else if (student[searchField]?.toString().toLowerCase().includes(searchString.toLowerCase())) {
                            return student
                        }
                        return null;
                    })
                    .map(student => {
                        return <tr key={student._id}>
                            <td><HighlightedText text={`${student.name || ""} ${student.surname || ""}`} highlight={searchField === "name" || searchField === "surname" ? searchString : ""} /></td>
                            <td><HighlightedText text={student.birthDate ? new Date(student.birthDate).toLocaleDateString('en-GB') : ""} highlight={searchField === "birthDate" ? searchString : ""} /></td>
                            <td><HighlightedText text={student.address || ""} highlight={searchField === "address" ? searchString : ""} /></td>
                            <td><HighlightedText text={student.citizenshipNumber || ""} highlight={searchField === "citizenshipNumber" ? searchString : ""} /></td>
                            <td><HighlightedText text={student.phoneNumber || ""} highlight={searchField === "phoneNumber" ? searchString : ""} /></td>
                            <td><HighlightedText text={`${student.parentOneName || ""} ${student.parentOneSurname || ""}`} highlight={searchField === "parentOneName" || searchField === "parentOneSurname" ? searchString : ""} /></td>
                            <td><HighlightedText text={`${student.parentTwoName || ""} ${student.parentTwoSurname || ""}`} highlight={searchField === "parentTwoName" || searchField === "parentTwoSurname" ? searchString : ""} /></td>
                            <td className="icon"><a href={`/finance/${student._id}`}> <img src={FinanceImage} alt="Finance SVG" /></a></td>
                            <td className="icon"><a href={`/education/${student._id}`}> <img src={EducationImage} alt="Level SVG" /></a></td>
                            <td className="icon"><a href={`/lessons/${student._id}`}> <img src={LessonImage} alt="Lessons SVG" /></a></td>
                            <td className="icon"><a href={`/edit/${student._id}`}><img src={EditImage} alt="Edit SVG" /></a></td>
                            <td className="icon"><img src={DeleteImage} alt="Delete SVG" onClick={() => handleDelete(student._id)} /></td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default Database;
