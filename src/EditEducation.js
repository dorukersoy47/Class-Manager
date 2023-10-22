import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditEducation = () => {
    //Parameters
    const { studentId, educationId } = useParams();
    const navigate = useNavigate();
    const [studentFullName, setStudentFullName] = useState('');
    const { t } = useTranslation();

    const [education, setEducation] = useState({
        level: '',
        startDate: '',
        endDate: ''
    })

    //Getting a single student
useEffect(() => {
    axios.get(`http://localhost:3001/getStudent/${studentId}`)
        .then(response => {
            //Combining the name and username to display it on the top of the page
            setStudentFullName(response.data.name + " " + response.data.surname);
            //Finding the specific level of education
            const educationItem = response.data.education.find(item => item._id.toString() === educationId.toString());

            //Directly updating the state with the education item
            if (educationItem) {
                setEducation({
                    level: educationItem.level || '',
                    startDate: educationItem.startDate || '',
                    endDate: educationItem.endDate || ''
                });
            }
        })
        .catch(error => console.error(error));
}, [educationId, studentId]);

    //Handling change in fields
    const handleChange = (e) => {
        setEducation({...education, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/editEducation/${studentId}/${educationId}`, education)
        .then(() => {
            alert(t('education.alertEdit'));
            navigate(`/education/${studentId}`);
        })
        .catch(error => console.error(error));
    }   

    return ( 
        <div>
            <h3 style={{textAlign: "center", textDecoration: "underline", marginBottom: "20px", fontSize: "30px" }}>{studentFullName}</h3>
            <form className="studentForm" onSubmit={handleSubmit}>
                <label className="formLabel">
                    {t('education.startDate')}
                    <input className="formInput" type="date" name="startDate" value={education.startDate} onChange={handleChange} />
                </label>
                <label className="formLabel">
                    {t('education.endDate')}
                    <input className="formInput" type="date" name="endDate" value={education.endDate} onChange={handleChange} />
                </label>
                <button className="submitButton" type="submit">{t('update')}</button>
            </form>
        </div>
     );
}
 
export default EditEducation;