import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './Navbar.js';
import Calender from './Calender.js';
import Database from './Database.js';
import FinanceModule from './FinanceModule';
import LevelModule from './LevelModule'
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
                        <Route path="/" element={<Calender />}></Route>
                        <Route path="/database" element={<Database/>}></Route>
                        <Route path="/finance/:id" element={<FinanceModule/>}></Route>
                        <Route path="/level/:id" element={<LevelModule />}></Route>
                        <Route path="/add" element={<AddStudent />}></Route>
                        <Route path="/addFinance/:id" element={<AddFinance />}></Route>
                        <Route path="/edit/:id" element={<EditStudent />}></Route>
                        <Route path="/editFinance/:id" element={<EditFinance />}></Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
