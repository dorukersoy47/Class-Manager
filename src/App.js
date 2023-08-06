import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './Navbar.js';
import CalendarModule from './CalendarModule.js';
import Database from './Database.js';
import FinanceModule from './FinanceModule';
import LevelModule from './LevelModule';
import AddStudent from './AddStudent';
import AddFinance from './AddFinance';
import EditStudent from './EditStudent';
import EditFinance from './EditFinance';
import LessonsModule from './LessonsModule';
import AddLesson from './AddLesson';
import EditLesson from './EditLesson';
import PreviewLesson from './PreviewLesson';
import EducationModule from './EducationModule';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<CalendarModule />} />
                        <Route path="/database" element={<Database />} />
                        <Route path="/finance/:id" element={<FinanceModule />} />
                        <Route path="/level/:id" element={<LevelModule />} />
                        <Route path="/add" element={<AddStudent />} />
                        <Route path="/addFinance/:id" element={<AddFinance />} />
                        <Route path="/edit/:id" element={<EditStudent />} />
                        <Route path="/editFinance/:studentId/:financeId" element={<EditFinance />} />
                        <Route path="/lessons/:id" element={<LessonsModule />}></Route>
                        <Route path="/addLesson/:id" element={<AddLesson />}></Route>
                        <Route path="/editLesson/:studentId/:lessonsId" element={<EditLesson />}></Route>
                        <Route path="/previewLesson/:studentId/:lessonsId" element={<PreviewLesson />}></Route>
                        <Route path="/education/:id" element={<EducationModule />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;