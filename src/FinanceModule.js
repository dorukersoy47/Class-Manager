import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditImage from './images/Edit.svg';
import DeleteImage from './images/Delete.svg';
import DownloadImage from './images/Download.svg';
import { FinancePDF } from './FinancePDF';
import { useTranslation } from 'react-i18next';

const FinanceModule = () => {
    //Parameters
    const [finance, setFinance] = useState([]);
    const [total, setTotal] = useState(0);
    const [lessonsNumber, setLessonsNumber] = useState(0);
    const lessonPrice = 400;
    const [studentFullName, setStudentFullName] = useState('');
    const { t } = useTranslation();

    const { id } = useParams();

    //Handling delete
    const handleDelete = (financeId) => {
        //Confirming the choice of the user
        if (window.confirm(t('finance.alertDelete'))) {
            axios.delete(`http://localhost:3001/deleteFinance/${id}/${financeId}`)
            .then(res => {
                if (res.status === 200) {
                    setFinance(finance.filter(item => item._id !== financeId));
                    setTotal(total - finance.find(item => item._id === financeId).value);
                }
            })
            .catch(error => console.log(error));
        }
    };

    //Downloading the finance report (link to FinancePDF function)
    const downloadPDF = () => {
        axios.get(`http://localhost:3001/getFinance/${id}`)
        .then(response => {
            FinancePDF(id, response.data, lessonsNumber, total, studentFullName, t);
        })
        .catch(error => console.error(error));
    };
     
    //Getting a specific student
    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${id}`)
            .then(response => {
            //Setting full name
            setStudentFullName(response.data.name + " " + response.data.surname)
            //Soring the finance chronologically
            const sortedFinance = response.data.finance.sort((a, b) => new Date(b.date) - new Date(a.date));
            setFinance(sortedFinance);
            setLessonsNumber(response.data.lessons.filter(item => item.status === "Completed").length);
        })
        .catch(error => console.error(error));
    }, [id]);
    
    //Finding the total debt of the student
    useEffect(() => {
        const totalValue = finance.reduce((total, item) => total + item.value, 0);
        setTotal(totalValue - lessonsNumber * lessonPrice);
    }, [finance, lessonsNumber, lessonPrice]);

    //UI
    return (
        <div className="finance">
            <h3 style={{textAlign: "center", textDecoration: "underline", marginBottom: "20px", marginUp: "0px", fontSize: "30px" }}>{studentFullName}</h3>
            <div className="addElement">
                <a className="add" href={`/addFinance/${id}`}>{t('finance.addTransaction')}</a>
            </div>
            <h2>{t('finance.totalDebt')}:</h2>
            <h3 style={{ color: total < 0 ? "red" : total === 0 ? 'black' : "green", fontWeight: "bold" }}>
                {total}
            </h3>
            <h3>{t('finance.amountOfLessonsCompleted')}: {lessonsNumber} (-{ lessonsNumber * lessonPrice})</h3>
            <h2>{t('finance.transactionHistory')}
                <div className="tooltip">
                    <img onClick={downloadPDF} src={DownloadImage} alt="Download SVG" />
                    <span className="tooltiptext">{t('finance.downloadPDF')}</span>
                </div>
            </h2>
            {finance.map((item, index) => (
                <div className="listBlock" key={index}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p style={{ color: Number(item.value) < 0 ? "red" : Number(item.value) === 0 ? "black" : "green", fontWeight: "bold" }}>
                        {item.value}
                    </p>
                    <p>{item.date ? new Date(item.date).toLocaleDateString('en-GB') : ""}</p>
                    <a href={`/editFinance/${id}/${item._id}`}><img src={EditImage} alt="Edit SVG" /></a>
                    <img src={DeleteImage} alt="Delete SVG" onClick={() => handleDelete(item._id)} />
                </div>
            ))}
        </div>
    );
}

export default FinanceModule;
