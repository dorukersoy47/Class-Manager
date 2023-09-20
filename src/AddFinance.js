import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddFinance = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [finance, setFinance] = useState({
        title: '',
        description: '',
        value: '',
        date: ''
    });

    //Getting Name for Writing on Module 
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
            alert('Finance added successfully');
            navigate(`/finance/${id}`);
        })
        .catch(error => console.error(error));
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
                <button className="submitButton" type="submit">Add Finance</button>
            </form>
        </div>
    );
}

export default AddFinance;