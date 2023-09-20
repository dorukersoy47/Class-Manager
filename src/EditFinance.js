import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditFinance = () => {
    const { studentId, financeId } = useParams();
    const navigate = useNavigate();
    const [studentFullName, setStudentFullName] = useState('');
    
    const [finance, setFinance] = useState({
        title: '',
        description: '',
        value: '',
        date: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${studentId}`)
        .then(response => {
            setStudentFullName(response.data.name + " " + response.data.surname)
            if (response.data.finance) {
                const financeItem = response.data.finance.find(item => item._id.toString() === financeId.toString());
                if (financeItem) {
                    const date = new Date(financeItem.date);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    setFinance({ ...financeItem, date: formattedDate });
                }
            }
        })
        .catch(error => console.error(error));
    }, [studentId, financeId]);


    const handleChange = (e) => {
        setFinance({ ...finance, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/editFinance/${studentId}/${financeId}`, finance)
            .then(() => {
                alert('Finance updated successfully');
                navigate(`/finance/${studentId}`);
            })
            .catch(error => console.error(`There was an error updating the finance: ${error}`));
    }

    return (
        <div>
            <h3 style={{textAlign: "center", textDecoration: "underline", marginBottom: "20px", fontSize: "30px" }}>{studentFullName}</h3>
            <form className="studentForm" onSubmit={handleSubmit}>
                <label className="formLabel">
                    Title:*
                    <input className="formInput" type="text" name="title" value={finance.title} onChange={handleChange} required />
                </label>
                <label className="formLabel">
                    Description:
                    <input className="formInput" type="text" name="description" value={finance.description} onChange={handleChange} />
                </label>
                <label className="formLabel">
                    Value:*
                    <input className="formInput" type="number" name="value" value={finance.value} onChange={handleChange} required />
                </label>
                <label className="formLabel">
                    Date:*
                    <input className="formInput" type="date" name="date" value={finance.date} onChange={handleChange} required />
                </label>
                <button className="submitButton" type="submit">Update Finance</button>
            </form>
        </div>
    );
}

export default EditFinance;
