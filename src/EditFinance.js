import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditFinance = () => {
    //Parameters
    const { studentId, financeId } = useParams();
    const navigate = useNavigate();
    const [studentFullName, setStudentFullName] = useState('');
    const { t } = useTranslation();
    
    const [finance, setFinance] = useState({
        title: '',
        description: '',
        value: '',
        date: ''
    });

    //Getting a student's data
    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${studentId}`)
        .then(response => {
            //Combining name and surname to display it on the top of the page
            setStudentFullName(response.data.name + " " + response.data.surname)
                if (response.data.finance) {
                    //Getting a specific finance object
                    const financeItem = response.data.finance.find(item => item._id.toString() === financeId.toString());
                    if (financeItem) {
                        //Updating the state with finance item
                        const date = new Date(financeItem.date);
                        // Convert the date to "YYYY-MM-DD" format to fill the edit table with initial data
                        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                        setFinance({ ...financeItem, date: formattedDate });
                    }
                }
        })
        .catch(error => console.error(error));
    }, [studentId, financeId]);


    //Handling the change in fields
    const handleChange = (e) => {
        setFinance({ ...finance, [e.target.name]: e.target.value});
    }

    //Handling the submit button
    const handleSubmit = (e) => {
        e.preventDefault();
        //Editing the old data in DB
        axios.put(`http://localhost:3001/editFinance/${studentId}/${financeId}`, finance)
            .then(() => {
                alert(t('finance.alertAdded'));
                navigate(`/finance/${studentId}`);
            })
            .catch(error => console.error(`There was an error updating the finance: ${error}`));
    }

    //UI
    return (
        <div>
            <h3 style={{textAlign: "center", textDecoration: "underline", marginBottom: "20px", fontSize: "30px" }}>{studentFullName}</h3>
            <form className="studentForm" onSubmit={handleSubmit}>
                <label className="formLabel">
                    {t('finance.title')}*
                    <input className="formInput" type="text" name="title" value={finance.title} onChange={handleChange} required />
                </label>
                <label className="formLabel">
                    {t('finance.description')}*
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
                <button className="submitButton" type="submit">{t('update')}</button>
            </form>
        </div>
    );
}

export default EditFinance;
