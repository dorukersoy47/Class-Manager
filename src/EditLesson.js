import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditLesson = () => {
    //Parameters
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

    //Formating time according to the format of *Time Options*
    const formatToTimeOption = datetime => {
        const dateObj = new Date(datetime);
        return `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${studentId}`)
        .then(response => {
            //Combining name and surname to display full name on top the page
            setStudentFullName(response.data.name + " " + response.data.surname)
            if (response.data.lessons) {
                const lessonsItem = response.data.lessons.find(item => item._id.toString() === lessonsId.toString());
                //Updating the state of lessons item
                if (lessonsItem) {
                    const date = new Date(lessonsItem.date);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

                    setLessons({
                        ...lessonsItem,
                        date: formattedDate,
                        startTime: formatToTimeOption(lessonsItem.startTime),
                        endTime: formatToTimeOption(lessonsItem.endTime)
                    });
                }
            }
        })
        .catch(error => console.error(error));
    }, [studentId, lessonsId]);
    

    //Handling the changes in the field
    const handleChange = (e) => {
        setLessons({ ...lessons, [e.target.name]: e.target.value });
    };

    //Handling the submit button
    const handleSubmit = (e) => {
        e.preventDefault();
        const { date, startTime, endTime } = lessons;
        const startDate = new Date(date + 'T' + startTime + ':00');
        const endDate = new Date(date + 'T' + endTime + ':00');
        const updatedLesson = { ...lessons, startTime: startDate, endTime: endDate };
        //Editing the old data in DB
        axios.put(`http://localhost:3001/editLesson/${studentId}/${lessonsId}`, updatedLesson)
        .then(() => {
            alert(t('lesson.alertEdit'));
            navigate(-1);
        })
        .catch(error => console.error(error));
    };

    //Forming the time options between 9-22 and adding them to an array for easy navigation in UI
    const timeOptions = [];
    for (let i = 9; i < 22; i++) {
        timeOptions.push(`${i.toString().padStart(2, '0')}:00`);
        timeOptions.push(`${i.toString().padStart(2, '0')}:30`);
    }

    //UI
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
                        <option value="">-- Select Recurring --</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </label>
                <label className="formLabel">
                    {t('lesson.status')}*
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
