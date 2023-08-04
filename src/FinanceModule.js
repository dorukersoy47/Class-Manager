import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditImage from './images/Edit.svg';

const FinanceModule = () => {
  const [finance, setFinance] = useState([]);
  const [total, setTotal] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/getStudent/${id}`)
      .then(response => {
        setFinance(response.data.finance);
        const totalValue = response.data.finance.reduce((total, item) => total + item.value, 0);
        setTotal(totalValue);
      })
      .catch(error => console.error(`There was an error retrieving the data: ${error}`));
  }, [id]);

  return (
    <div className="finance">
      <div className="addElement">
                <a className="add" href={`/addFinance/${id}`}>Add Finance</a>
            </div>
        <h2>Total Debt</h2>
        <h3 style={{color: total < 0 ? "red": total === 0 ? 'black' : "green", fontWeight:"bold"}}>
                {total}
        </h3>
        <h2>Transaction History</h2>
      {finance.map((item, index) => (
        <div className="transaction" key={index} >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p style={{color: Number(item.value) < 0 ? "red" : Number(item.value) === 0 ? "black" : "green", fontWeight: "bold"}}>
            {item.value}
            </p>
          <p>{item.date ? new Date(item.date).toLocaleDateString('en-GB') : ""}</p>
          <a href={`/editFinance/${id}`}><img src={EditImage} alt="Edit SVG" /></a>
        </div>
      ))}
    </div>
  );
}

export default FinanceModule;
