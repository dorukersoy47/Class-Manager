import './index.css';
import Navbar from './Navbar.js';
import Calender from './Calender.js';
import Database from './Database.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Calender />}></Route>
                        <Route path="/database" element={<Database/>}></Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
