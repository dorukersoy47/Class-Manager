import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PreviewLesson = () => {
    const { studentId, lessonsId } = useParams();
    console.log(lessonsId)
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${studentId}`)
            .then(response => {
                if (response.data.lessons) {
                    const foundLesson = response.data.lessons.find(item => item._id.toString() === lessonsId.toString());
                    if (foundLesson) {
                        setLesson(foundLesson);
                    }
                }
            })
            .catch(error => console.error(`There was an error retrieving the lesson: ${error}`));
    }, [studentId, lessonsId]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this lesson?")) {
            axios.delete(`http://localhost:3001/deleteLesson/${studentId}/${lessonsId}`)
                .then(() => {
                    alert('Lesson deleted successfully');
                    navigate(-1);
                })
                .catch(error => console.error(`There was an error deleting the lesson: ${error}`));
        }
    };

    return (
        <div className="lessonPreview">
            <h2>{lesson.instrument} Lesson</h2>
            <p>Date: {lesson.date}</p>
            <p>Start Time: {lesson.startTime}</p>
            <p>End Time: {lesson.endTime}</p>
            <p>Recurring: {lesson.recurring ? "Yes" : "No"}</p>
            <p>Status: {lesson.status}</p>
            <button onClick={() => navigate(`/editLesson/${studentId}/${lessonsId}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default PreviewLesson;
