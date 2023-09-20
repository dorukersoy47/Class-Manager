import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddFinance = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [finance, setFinance] = useState({
        title: '',
        description: '',
        value: '',
        date: ''
    });
 
    const [studentFullName, setStudentFullName] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${id}`)
        .then(response => {
            setStudentFullName(response.data.name + " " + response.data.surname)
        })
    }) 

    const handleChange = (e) => {
        setFinance({...finance, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/addFinance/${id}`, finance)
        .then(response => {
            alert(t('finance.alertAdded'));
            navigate(`/finance/${id}`);
        })
        .catch(error => console.error(error));
    }

    return (
        <div>
            <h3 style={{textAlign: "center", textDecoration: "underline", marginBottom: "20px", fontSize: "30px" }}>{studentFullName}</h3>
            <form className="studentForm" onSubmit={handleSubmit}>
                <label className="formLabel">
                    {t('finance.title')}*
                    <input className="formInput" type="text" name="title" value={finance.title} onChange={handleChange} required />
                </label>
                <label className="formLabel">
                    {t('finance.description')}
                    <input className="formInput" type="text" name="description" value={finance.description} onChange={handleChange} />
                </label>
                <label className="formLabel">
                    {t('finance.value')}*
                    <input className="formInput" type="number" name="value" value={finance.value} onChange={handleChange} required />
                </label>
                <label className="formLabel">
                    {t('finance.date')}*
                    <input className="formInput" type="date" name="date" value={finance.date} onChange={handleChange} required />
                </label>
                <button className="submitButton" type="submit">{t('finance.add')}</button>
            </form>
        </div>
    );
}

export default AddFinance;