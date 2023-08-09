import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEducation = () => {
    const { studentId, educationId } = useParams();
    const navigate = useNavigate();

    const [education, setEducation] = useState({
        level: '',
        startDate: '',
        endDate: ''
    })

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${studentId}`)
            .then(response => {
                const educationItem = response.data.education.find(item => item._id.toString() === educationId.toString());
                if (educationItem) {
                    let updatedEducation = { ...educationItem };
                    if (educationItem.startDate) {
                        const date = new Date(educationItem.startDate);
                        updatedEducation.startDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    } else {
                        updatedEducation.startDate = ''; // set to empty string if null
                    }
                    if (educationItem.endDate) {
                        const date = new Date(educationItem.endDate);
                        updatedEducation.endDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    } else {
                        updatedEducation.endDate = ''; // set to empty string if null
                    }
                    setEducation(updatedEducation);
                }
            })
            .catch(error => console.error(`There was an error retrieving the education: ${error}`));
    }, [educationId, studentId]);

    const handleChange = (e) => {
        setEducation({
            ...education,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/editEducation/${studentId}/${educationId}`, education)
            .then(() => {
                alert('Level updated successfully');
                navigate(`/education/${studentId}`);
            })
            .catch(error => console.error(`There was an error updating the education: ${error}`));
    }

    return ( 
        <form className="studentForm" onSubmit={handleSubmit}>
            <label className="formLabel">
                Start Date:
                <input className="formInput" type="date" name="startDate" value={education.startDate} onChange={handleChange} />
            </label>
            <label className="formLabel">
                End Date:
                <input className="formInput" type="date" name="endDate" value={education.endDate} onChange={handleChange} />
            </label>
            <button className="submitButton" type="submit">Update Level</button>
        </form>
     );
}
 
export default EditEducation;