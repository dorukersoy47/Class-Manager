import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EducationPDF } from './EducationPDF';
import EditImage from './images/Edit.svg'

const EducationModule = () => { 

    const { id } = useParams();
    const [educationLevels, setEducationLevels] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${id}`)
            .then(response => {
                setEducationLevels(response.data.education);
            })
            .catch(error => console.error(`There was an error retrieving the data: ${error}`));
    }, [id]);
    
    const downloadPDF = () => {
        axios.get(`http://localhost:3001/getEducation/${id}`)
            .then(response => {
                EducationPDF(id, response.data)
            })
            .catch(error => {
                console.error('There was an error retrieving the data!', error);
            })
    }

    return ( 
        <div>
            <div className="educationModule">
                <p onClick={downloadPDF} className="educationModulep">Generate Report</p>
                <h1 className="educationModuleh1">Education Module</h1>
                {educationLevels.map((item, index) => (
                    <div className="educationList" key={index}>
                        <div className="educationLevel">
                            <h2 className="educationLevelh2">Level {index + 1}</h2>
                        </div>
                        <div className="educationLevel">
                            <p className="educationLevelp"><b className="educationLevelp">Start Date:</b> {item.startDate ? new Intl.DateTimeFormat('en-GB').format(new Date(item.startDate)) : "Haven't started"}</p>
                        </div>
                        <div className="educationLevel">
                            <p className="educationLevelp"><b className="educationLevelp">End Date:</b> {item.endDate ? new Intl.DateTimeFormat('en-GB').format(new Date(item.endDate)) : "Haven't finished"}</p>
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