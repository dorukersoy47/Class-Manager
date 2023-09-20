import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditImage from './images/Edit.svg';
import DeleteImage from './images/Delete.svg';
import { useTranslation } from 'react-i18next';

const PreviewLesson = () => {
    const { studentId, lessonsId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    const formatTime = (time) => {
        const d = new Date(time);
        return `${String(d.getHours()).padStart(2, '0')}.${String(d.getMinutes()).padStart(2, '0')}`;
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}.${d.getFullYear()}`;
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${studentId}`)
            .then(({ data }) => {
                const foundLesson = data.lessons.find(item => item._id === lessonsId);
                setStudent(data);
                if (foundLesson) {
                    setLesson({ ...foundLesson, date: formatDate(foundLesson.date), startTime: formatTime(foundLesson.startTime), endTime: formatTime(foundLesson.endTime) });
                }
                setLoading(false); 
            })
            .catch(error => {
                console.error(error);
                setLoading(false); 
            });
    }, [studentId, lessonsId]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this lesson?")) {
            axios.delete(`http://localhost:3001/deleteLesson/${studentId}/${lessonsId}`)
            .then(() => {
                alert('Lesson deleted successfully');
                navigate(-1);
            })
            .catch(error => console.error(error));
        }
    };

    return (
        <div>
            {loading ?
            ( <p>Loading...</p> ) : (
            <div className="lessonPreview">
                <h2>{ student?.name } { student?.surname }</h2>
                <h3>{lesson?.instrument} Lesson</h3>
                <p className="lessonPreviewp"><b>Date: </b>{lesson?.date}</p>
                <p className="lessonPreviewp"><b>Start Time: </b>{lesson?.startTime}</p>
                <p className="lessonPreviewp"><b>End Time: </b>{lesson?.endTime}</p>
                <p className="lessonPreviewp"><b>Recurring: </b>{lesson?.recurring ? "Yes" : "No"}</p>
                <p className="lessonPreviewp"><b>Status: </b>{lesson?.status}</p>
                <a className="lessonPreviewp" href={`/editLesson/${studentId}/${lessonsId}`}><img src={EditImage} alt="Edit SVG" /></a>
                <img className="lessonPreviewp" src={DeleteImage} alt="Delete SVG" onClick={() => handleDelete()} />
            </div>
            )}
        </div>
    );
};

export default PreviewLesson;