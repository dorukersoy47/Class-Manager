import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import DeleteImage from "./images/Delete.svg";
import EditImage from "./images/Edit.svg";

const LessonsModule = () => {
    const [lessons, setLessons] = useState([]);
    const { id } = useParams();
    const [studentFullName, setStudentFullName] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${id}`)
        .then((response) => {
                setStudentFullName(response.data.name + " " + response.data.surname)
            const sortedLessons = response.data.lessons.sort((a, b) => new Date(b.date) - new Date(a.date));
            setLessons(sortedLessons);
        })
        .catch((error) => console.error(error));
    }, [id]);

    const handleDelete = (lessonId) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            axios.delete(`http://localhost:3001/deleteLesson/${id}/${lessonId}`)
            .then(res => {
                if (res.status === 200) {
                    setLessons(lessons.filter(item => item._id !== lessonId));
                }
            })
            .catch(error => console.log(error));
        }
    };

    return ( 
        <div className="lessons">
            <h3 style={{textAlign: "center", textDecoration: "underline", marginBottom: "20px", fontSize: "30px" }}>{studentFullName}</h3>
            <div className="addElement">
                <a className="add" href={`/addLesson/${id}`}>Add Lesson</a>
            </div>
            <div className="lessonMap">
                {lessons.map((lesson, index) => {
                    return (
                    <div className="listBlock" key={index}>
                        <p><b>Date</b> {lesson.date ? new Date(lesson.date).toLocaleDateString('en-GB') : ""}</p>
                        <p><b>Start Time:</b> {lesson.startTime ? new Date(lesson.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ""}</p>
                        <p><b>End Time:</b> {lesson.endTime ? new Date(lesson.endTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ""}</p>
                        <p><b>Instrument:</b> {lesson.instrument}</p>  
                        <p><b>Recurring:</b> {lesson.recurring ? "yes" : "no"}</p>
                        <p><b>Status:</b> {lesson.status}</p>
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