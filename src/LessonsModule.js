import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import DeleteImage from "./images/Delete.svg";
import EditImage from "./images/Edit.svg";
import { useTranslation } from 'react-i18next';

const LessonsModule = () => {
    //Parameters
    const [lessons, setLessons] = useState([]);
    const { id } = useParams();
    const [studentFullName, setStudentFullName] = useState('');
    const { t } = useTranslation();

    //Getting a specific student
    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${id}`)
            .then((response) => {
            //Setting full name to display on top
                setStudentFullName(response.data.name + " " + response.data.surname)
            //Sorting lessons according to chronological order
            const sortedLessons = response.data.lessons.sort((a, b) => new Date(b.date) - new Date(a.date));
            setLessons(sortedLessons);
        })
        .catch((error) => console.error(error));
    }, [id]);

    //Handling deleting
    const handleDelete = (lessonId) => {
        //Confirming the choice of the user
        if (window.confirm(t('lesson.alertDelete'))) {
            //Deleting from the database
            axios.delete(`http://localhost:3001/deleteLesson/${id}/${lessonId}`)
            .then(res => {
                if (res.status === 200) {
                    setLessons(lessons.filter(item => item._id !== lessonId));
                }
            })
            .catch(error => console.log(error));
        }
    };

    //UI
    return ( 
        <div className="lessons">
            <h3 style={{textAlign: "center", textDecoration: "underline", marginBottom: "20px", fontSize: "30px" }}>{studentFullName}</h3>
            <div className="addElement">
                <a className="add" href={`/addLesson/${id}`}>{t('add')}</a>
            </div>
            <div className="lessonMap">
                {lessons.map((lesson, index) => {
                    return (
                    <div className="listBlock" key={index}>
                        <p><b>{t('lesson.date')}:</b> {lesson.date ? new Date(lesson.date).toLocaleDateString('en-GB') : ""}</p>
                        <p><b>{t('lesson.startTime')}:</b> {lesson.startTime ? new Date(lesson.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ""}</p>
                        <p><b>{t('lesson.endTime')}:</b> {lesson.endTime ? new Date(lesson.endTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ""}</p>
                        <p><b>{t('lesson.instrument')}:</b> {lesson.instrument}</p>  
                        <p><b>{t('lesson.recurring')}:</b> {lesson.recurring ? t('lesson.yes') : t('lesson.no')}</p>
                        <p><b>{t('lesson.status')}:</b> {t(`lesson.${lesson.status}`)}</p>
                        <a href={`/editLesson/${id}/${lesson._id}`}><img src={EditImage} alt="Edit SVG" /></a>
                        <img src={DeleteImage} alt="Delete SVG" onClick={() => handleDelete(lesson._id)} />
                    </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default LessonsModule;