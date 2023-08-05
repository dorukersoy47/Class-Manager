import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditLesson = () => {
    const { studentId, lessonsId } = useParams();
    const navigate = useNavigate();

    const [lessons, setLessons] = useState({
        date: '',
        startTime: '',
        endTime: '',
        instrument: '',
        recurring: '',
        status: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${studentId}`)
            .then(response => {
                if (response.data.lessons) {
                    const lessonsItem = response.data.lessons.find(item => item._id.toString() === lessonsId.toString());
                    if (lessonsItem) {
                        setLessons({
                            ...lessonsItem,
                            date: new Date(lessonsItem.date).toISOString().slice(0, 10),
                            startTime: new Date(lessonsItem.startTime).toISOString().slice(0, 16),
                            endTime: new Date(lessonsItem.endTime).toISOString().slice(0, 16)
                        });
                    }
                }
            })
            .catch(error => console.error(`There was an error retrieving the lesson: ${error}`));
    }, [studentId, lessonsId]);

    const handleChange = (e) => {
        setLessons({
            ...lessons,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedLesson = {
            ...lessons,
            startTime: new Date(lessons.startTime),
            endTime: new Date(lessons.endTime)
        };
        axios.put(`http://localhost:3001/editLesson/${studentId}/${lessonsId}`, updatedLesson)
            .then(() => {
                alert('Lesson updated successfully');
                navigate(`/lessons/${studentId}`);
            })
            .catch(error => console.error(`There was an error updating the lesson: ${error}`));
    };

    return (
        <form onSubmit={handleSubmit} className="studentForm">
            <label className="formLabel">
                Date:*
                <input className="formInput" type="date" name="date" value={lessons.date} onChange={handleChange} required />
            </label>
            <label className="formLabel">
                <input className="formInput" type="datetime-local" name="startTime" value={lessons.startTime} onChange={handleChange} required />
            </label>
            <label className="formLabel">
                End Time:*
                <input className="formInput" type="datetime-local" name="endTime" value={lessons.endTime} onChange={handleChange} required />
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
            <button className="submitButton" type="submit">Update Lesson</button>
        </form>
    );
};

export default EditLesson;
