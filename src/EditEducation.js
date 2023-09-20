import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditEducation = () => {
    const { studentId, educationId } = useParams();
    const navigate = useNavigate();
    const [studentFullName, setStudentFullName] = useState('');
    const { t } = useTranslation();

    const [education, setEducation] = useState({
        level: '',
        startDate: '',
        endDate: ''
    })

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${studentId}`)
            .then(response => {
                setStudentFullName(response.data.name + " " + response.data.surname);
                const educationItem = response.data.education.find(item => item._id.toString() === educationId.toString());
                if (educationItem) {
                    let updatedEducation = { ...educationItem };
                    if (educationItem.startDate) {
                        const date = new Date(educationItem.startDate);
                        updatedEducation.startDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    } else {
                        updatedEducation.startDate = ''; 
                    }
                    if (educationItem.endDate) {
                        const date = new Date(educationItem.endDate);
                        updatedEducation.endDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    } else {
                        updatedEducation.endDate = ''; 
                    }
                    setEducation(updatedEducation);
                }
            })
            .catch(error => console.error(error));
    }, [educationId, studentId]);

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
                    {t('education.alertEdit')}
                    <input className="formInput" type="date" name="startDate" value={education.startDate} onChange={handleChange} />
                </label>
                <label className="formLabel">
                    {t('education.alertEdit')}
                    <input className="formInput" type="date" name="endDate" value={education.endDate} onChange={handleChange} />
                </label>
                <button className="submitButton" type="submit">{t('update')}</button>
            </form>
        </div>
     );
}
 
export default EditEducation;