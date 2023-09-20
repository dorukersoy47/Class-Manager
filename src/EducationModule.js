import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EducationPDF } from './EducationPDF';
import EditImage from './images/Edit.svg';
import { useTranslation } from 'react-i18next';

const EducationModule = () => { 

    const { id } = useParams();
    const [educationLevels, setEducationLevels] = useState([]);
    const [studentFullName, setStudentFullName] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${id}`)
            .then(response => {
                setStudentFullName(response.data.name + " " + response.data.surname)
                setEducationLevels(response.data.education);
            })
            .catch(error => console.error(error));
    }, [id]);
    
    const downloadPDF = () => {
        axios.get(`http://localhost:3001/getEducation/${id}`)
        .then(response => { EducationPDF(id, response.data, studentFullName) })
        .catch(error => console.error(error));
    }

    return ( 
        <div>
            <div className="educationModule">
                <h3 style={{textAlign: "center", textDecoration: "underline", marginBottom: "20px", fontSize: "30px" }}>{studentFullName}</h3>
                <button onClick={downloadPDF} className="educationModuleButton">{t('education.generateReport')}</button>
                <h1 className="educationModuleh1">{t('education.educationModule')}</h1>
                {educationLevels.map((item, index) => (
                    <div className="educationList" key={index}>
                        <div className="educationLevel">
                            <h2 className="educationLevelh2">{t('education.level')}_{index + 1}</h2>
                        </div>
                        <div className="educationLevel">
                            <p className="educationLevelp"><b className="educationLevelp">{t('education.startDate')}:</b> {item.startDate ? new Intl.DateTimeFormat('en-GB').format(new Date(item.startDate)) : t('education.notStarted')}</p>
                        </div>
                        <div className="educationLevel">
                            <p className="educationLevelp"><b className="educationLevelp">{t('education.endDate')}:</b> {item.endDate ? new Intl.DateTimeFormat('en-GB').format(new Date(item.endDate)) : t('education.notStarted')}</p>
                        </div>
                        <div className="educationLevelDiv">
                            <a className="educationLevela" href={`/editEducation/${id}/${item._id}`}><img className="educationLevelp" src={EditImage} alt="Edit SVG" /></a>
                        </div>
                    </div>                    
                ))}
            </div>
        </div>
     );
}
 
export default EducationModule;