import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditImage from './images/Edit.svg';
import DeleteImage from './images/Delete.svg';

const FinanceModule = () => {
    const [finance, setFinance] = useState([]);
    const [total, setTotal] = useState(0);
    const [lessonsNumber, setLessonsNumber] = useState();
    const lessonPrice = 400;

    const { id } = useParams();

    const handleDelete = (financeId) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            axios.delete(`http://localhost:3001/deleteFinance/${id}/${financeId}`)
                .then(res => {
                    if (res.status === 200) {
                        setFinance(finance.filter(item => item._id !== financeId));
                        setTotal(total - finance.find(item => item._id === financeId).value);
                    }
                })
                .catch(err => console.log(err));
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/getStudent/${id}`)
            .then(response => {
                setFinance(response.data.finance);
                setLessonsNumber(response.data.lessons.length);
            })
            .catch(error => console.error(`There was an error retrieving the data: ${error}`));
    }, [id]);

    useEffect(() => {
        const totalValue = finance.reduce((total, item) => total + item.value, 0);
        setTotal(totalValue - lessonsNumber * lessonPrice);
    }, [finance, lessonsNumber, lessonPrice]);

    return (
        <div className="finance">
            <div className="addElement">
                <a className="add" href={`/addFinance/${id}`}>Add Finance</a>
            </div>
            <h2>Total Debt</h2>
            <h3 style={{ color: total < 0 ? "red" : total === 0 ? 'black' : "green", fontWeight: "bold" }}>
                {total}
            </h3>
            <h3>Amount of Lessons Made: {lessonsNumber} (-{ lessonsNumber * lessonPrice})</h3>
            <h2>Transaction History</h2>
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
