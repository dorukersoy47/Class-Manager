import './index.css';
import Navbar from './Navbar.js';
import Calender from './Calender.js';
import Database from './Database.js';
import FinanceModule from './FinanceModule';
import LevelModule from './LevelModule';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddStudent from './AddStudent';

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
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
