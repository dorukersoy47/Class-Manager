import React from 'react';
import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FinanceImage from './images/Finance.svg';
import EducationImage from './images/Education.svg';
import DeleteImage from './images/Delete.svg';
import EditImage from './images/Edit.svg';
import LessonImage from './images/Lesson.svg';
import { useTranslation } from 'react-i18next';

const Database = () => {

    const [students, setStudents] = useState([]);
    const [searchField, setSearchField] = useState('name');
    const [searchString, setSearchString] = useState('');
    const { t } = useTranslation();

    const HighlightedText = ({ text = "", highlight = "" }) => {
        text = text.toString();
        if (!highlight.trim()) {
            return <span>{text}</span>;
        }
        const regex = new RegExp(`(${highlight})`, "gi");
        const parts = text.split(regex);

        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={index} style={{ backgroundColor: "yellow" }}>{part}</span>) : ( part )
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
        if (window.confirm(t('alertDelete'))) {
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
                <a className="add" href="./add">{t('addStudent')}</a>
            </div>
            <div className="searchBar">
                <div className="searchField">
                    <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                        <option value="name">{t('name')}</option>
                        <option value="surname">{t('surname')}</option>
                        <option value="birthDate">{t('birthDate')}</option>
                        <option value="address">{t('address')}</option>
                        <option value="citizenshipNumber">{t('citizenshipNumber')}</option>
                        <option value="phoneNumber">{t('phoneNumber')}</option>
                        <option value="parentOneName">{t('parentOneName')}</option>
                        <option value="parentOneSurname">{t('parentOneSurname')}</option>
                        <option value="parentTwoName">{t('parentTwoName')}</option>
                        <option value="parentTwoSurname">{t('parentTwoSurname')}</option>
                    </select>
                </div>
                <div className="searchInput">
                    <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Search..." />
                </div>
            </div>
            <table className="studentDbTable">
                <thead>
                    <tr>
                        <th>{t('name')}</th>
                        <th>{t('surname')}</th>
                        <th>{t('address')}</th>
                        <th>{t('citizenshipNumber')}</th>
                        <th>{t('phoneNumber')}</th>
                        <th>{t('parentOne')}</th>
                        <th>{t('parentTwo')}</th>
                        <th>{t('finance.finance')}</th>
                        <th>{t('education.education')}</th>
                        <th>{t('lessons')}</th>
                        <th>{t('edit')}</th>
                        <th>{t('delete')}</th>
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
                            <td className="icon"><a href={`/education/${student._id}`}> <img src={EducationImage} alt="Education SVG" /></a></td>
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
