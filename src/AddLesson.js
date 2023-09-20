import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddLesson = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [lessons, setLessons] = useState({
        date: '',
        startTime: '',
        endTime: '',
        instrument: '',
        recurring: '',
        status: ''
    });

    const [studentFullName, setStudentFullName] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${id}`)
            .then(response => {
                setStudentFullName(response.data.name + " " + response.data.surname)
            })
    })

    const handleChange = (e) => {
        setLessons({ ...lessons, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { date, startTime, endTime } = lessons;
        const startDate = new Date(date + 'T' + startTime + ':00');
        const endDate = new Date(date + 'T' + endTime + ':00');
        const newLesson = { ...lessons, startTime: startDate, endTime: endDate };

        axios.post(`http://localhost:3001/addLessons/${id}`, newLesson)
            .then(response => {
                alert(t('lesson.alertAdded'));
                navigate(`/lessons/${id}`);
            })
            .catch(error => console.error(error));
    };

    const timeOptions = [];
    for (let i = 9; i < 22; i++) {
        timeOptions.push(`${i.toString().padStart(2, '0')}:00`);
        timeOptions.push(`${i.toString().padStart(2, '0')}:30`);
    }

    return (
        <div>
            <h3 style={{ textAlign: "center", textDecoration: "underline", marginBottom: "20px", fontSize: "30px" }}>{studentFullName}</h3>
            <form onSubmit={handleSubmit} className="studentForm">
                <label className="formLabel">
                    {t('lesson.date')}*
                    <input className="formInput" type="date" name="date" value={lessons.date} onChange={handleChange} required />
                </label>
                <label className="formLabel">
                    {t('lesson.startTime')}*
                    <select className="formInput" name="startTime" value={lessons.startTime} onChange={handleChange} required>
                        <option value="">{t('lesson.selectStartTime')}</option>
                        {timeOptions.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </label>
                <label className="formLabel">
                    {t('lesson.endTime')}*
                    <select className="formInput" name="endTime" value={lessons.endTime} onChange={handleChange} required>
                        <option value="">{t('lesson.selectEndTime')}</option>
                        {timeOptions.map((time, index) => (
                            index < timeOptions.length - 1 && <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </label>
                <label className="formLabel">
                    {t('lesson.instrument')}*
                    <input className="formInput" type="String" name="instrument" value={lessons.instrument} onChange={handleChange} required />
                </label>
                <label className="formLabel">
                    {t('lesson.recurring')}*
                    <select className="formInput" name="recurring" value={lessons.recurring} onChange={handleChange} required>
                        <option value="">{t('lesson.selectRecurring')}</option>
                        <option value={true}>{t('lesson.yes')}</option>
                        <option value={false}>{t('lesson.no')}</option>
                    </select>
                </label>
                <label className="formLabel">
                    {t('lesson.status')}*
                    <select className="formInput" name="status" value={lessons.status} onChange={handleChange} required>
                        <option value="">{t('lesson.selectStatus')}</option>
                        <option value={"Scheduled"}>{t('lesson.scheduled')}</option>
                        <option value={"Completed"}>{t('lesson.completed')}</option>
                        <option value={"Cancelled"}>{t('lesson.cancelled')}</option>
                    </select>
                </label>
                <button className="submitButton" type="submit">{t('lesson.add')}</button>
            </form>
        </div>
    );
};

export default AddLesson;