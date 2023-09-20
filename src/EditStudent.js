import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();    
    const { t } = useTranslation();

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
        phoneNumber: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${id}`)
            .then(response => {
                const date = new Date(response.data.birthDate);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                setStudent({ ...response.data, birthDate: formattedDate });
            })
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/editStudent/${id}`, student)
        .then(response => {
            alert(t('alertEdit'));
            navigate('/database');
        })
        .catch(error => console.error(error));
    };

    return (
        <form className="studentForm" onSubmit={handleSubmit}>
            <h3>Demographic</h3>
            <label className="formLabel">
                {t('name')}*
                <input className="formInput" type="text" name="name" value={student.name} onChange={handleChange} required />
            </label>
            <label className="formLabel">
                {t('surname')}*
                <input className="formInput" type="text" name="surname" value={student.surname} onChange={handleChange} required />
            </label>
            <label className="formLabel">
                {t('parentOneName')}
                <input className="formInput" type="text" name="parentOneName" value={student.parentOneName} onChange={handleChange} />
            </label>
            <label className="formLabel">
                {t('parentOneSurname')}
                <input className="formInput" type="text" name="parentOneSurname" value={student.parentOneSurname} onChange={handleChange} />
            </label>
            <label className="formLabel">
                {t('parentTwoName')}
                <input className="formInput" type="text" name="parentTwoName" value={student.parentTwoName} onChange={handleChange} />
            </label>
            <label className="formLabel">
                {t('parentTwoSurname')}
                <input className="formInput" type="text" name="parentTwoSurname" value={student.parentTwoSurname} onChange={handleChange} />
            </label>
            <label className="formLabel">
                {t('birthDate')}*
                <input className="formInput" type="date" name="birthDate" value={student.birthDate} onChange={handleChange} required />
            </label>
            <label className="formLabel">
                {t('address')}*
                <input className="formInput" type="text" name="address" value={student.address} onChange={handleChange} required />
            </label>
            <label className="formLabel">
                {t('citizenshipNumber')}*
                <input className="formInput" type="number" name="citizenshipNumber" value={student.citizenshipNumber} onChange={handleChange} required />
            </label>
            <label className="formLabel">
                {t('phoneNumber')}*
                <input className="formInput" type="number" name="phoneNumber" value={student.phoneNumber} onChange={handleChange} required />
            </label>
            <button className="submitButton" type="submit">{t('update')}</button>
        </form>
    );
}

export default EditStudent;