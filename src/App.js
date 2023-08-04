import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './Navbar.js';
import Calender from './Calender.js';
import Database from './Database.js';
import FinanceModule from './FinanceModule';
import LevelModule from './LevelModule';
import AddStudent from './AddStudent';
import AddFinance from './AddFinance';
import EditStudent from './EditStudent';
import EditFinance from './EditFinance';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Calender />} />
                        <Route path="/database" element={<Database />} />
                        <Route path="/finance/:id" element={<FinanceModule />} />
                        <Route path="/level/:id" element={<LevelModule />} />
                        <Route path="/add" element={<AddStudent />} />
                        <Route path="/addFinance/:id" element={<AddFinance />} />
                        <Route path="/edit/:id" element={<EditStudent />} />
                        <Route path="/editFinance/:studentId/:financeId" element={<EditFinance />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;