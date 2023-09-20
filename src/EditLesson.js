import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditLesson = () => {
    const { studentId, lessonsId } = useParams();
    const navigate = useNavigate();
    const [studentFullName, setStudentFullName] = useState('');
    const { t } = useTranslation();

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
            setStudentFullName(response.data.name + " " + response.data.surname)
            if (response.data.lessons) {
                const lessonsItem = response.data.lessons.find(item => item._id.toString() === lessonsId.toString());
                if (lessonsItem) {
                    const date = new Date(lessonsItem.date);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
                    const formatDateTime = datetime => {
                        const dateObj = new Date(datetime);
                        return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}T${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
                    };

                    setLessons({...lessonsItem, date: formattedDate, startTime: formatDateTime(lessonsItem.startTime), endTime: formatDateTime(lessonsItem.endTime) });
                }
            }
        })
        .catch(error => console.error(error));
    }, [studentId, lessonsId]);
    

    const handleChange = (e) => {
        setLessons({ ...lessons, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedLesson = { ...lessons, startTime: new Date(lessons.startTime), endTime: new Date(lessons.endTime) };
        axios.put(`http://localhost:3001/editLesson/${studentId}/${lessonsId}`, updatedLesson)
            .then(() => {
                alert('lesson.alertEdit');
                navigate(-1);
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h3 style={{textAlign: "center", textDecoration: "underline", marginBottom: "20px", fontSize: "30px" }}>{studentFullName}</h3>
            <form onSubmit={handleSubmit} className="studentForm">
                <label className="formLabel">
                    {t('lesson.startTime')}*
                    <input className="formInput" type="date" name="date" value={lessons.date} onChange={handleChange} required />
                </label>
                <label className="formLabel">
                    <input className="formInput" type="datetime-local" name="startTime" value={lessons.startTime} onChange={handleChange} required />
                </label>
                <label className="formLabel">
                    {t('lesson.endTime')}*
                    <input className="formInput" type="datetime-local" name="endTime" value={lessons.endTime} onChange={handleChange} required />
                </label>
                <label className="formLabel">
                    {t('lesson.instrument')}*
                    <input className="formInput" type="String" name="instrument" value={lessons.instrument} onChange={handleChange} required />
                </label>
                <label className="formLabel">
                    {t('lesson.resurring')}
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
        </div>
    );
};

export default EditLesson;
