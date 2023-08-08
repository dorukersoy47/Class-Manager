import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddLesson = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [lessons, setLessons] = useState({
        date: '',
        startTime: '',
        endTime: '',
        instrument: '',
        recurring: '',
        status: ''
    });

    const handleChange = (e) => {
        setLessons({
            ...lessons,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { date, startTime, endTime } = lessons;
        const startDate = new Date(date + 'T' + startTime + ':00');
        const endDate = new Date(date + 'T' + endTime + ':00');
    
        const newLesson = {
            ...lessons,
            startTime: startDate,
            endTime: endDate
        };
    
        axios.post(`http://localhost:3001/addLessons/${id}`, newLesson)
            .then(response => {
                alert('Lesson added succesfully');
                navigate(`/lessons/${id}`);
            })
            .catch(error => console.error(`There was an error adding the lesson: ${error}`));
    };
    

    const timeOptions = [];
    for (let i = 9; i < 22; i++) {
        timeOptions.push(`${i.toString().padStart(2, '0')}:00`);
        timeOptions.push(`${i.toString().padStart(2, '0')}:30`);
    }

    return (
        <form onSubmit={handleSubmit} className="studentForm">
            <label className="formLabel">
                Date:*
                <input className="formInput" type="date" name="date" value={lessons.date} onChange={handleChange} required />
            </label>
            <label className="formLabel">
                Start Time:*
                <select className="formInput" name="startTime" value={lessons.startTime} onChange={handleChange} required>
                    <option value="">-- Select Start Time --</option>
                    {timeOptions.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </label>
            <label className="formLabel">
                End Time:*
                <select className="formInput" name="endTime" value={lessons.endTime} onChange={handleChange} required>
                    <option value="">-- Select End Time --</option>
                    {timeOptions.map((time, index) => (
                        index < timeOptions.length - 1 && <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </label>
            <label className="formLabel">
                Instrument:*
                <input className="formInput" type="String" name="instrument" value={lessons.instrument} onChange={handleChange} required />
            </label>
            <label className="formLabel">
                Recurring:*
                <select className="formInput" name="recurring" value={lessons.recurring} onChange={handleChange} required>
                    <option value="">-- Select Recurring --</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </label>
            <label className="formLabel">
                Status:*
                <select className="formInput" name="status" value={lessons.status} onChange={handleChange} required>
                    <option value="">-- Select Status --</option>
                    <option value={"Scheduled"}>Scheduled</option>
                    <option value={"Completed"}>Completed</option>
                    <option value={"Cancelled"}>Cancelled</option>
                </select>
            </label>
            <button className="submitButton" type="submit">Add Lesson</button>
        </form>
    );
};

export default AddLesson;
