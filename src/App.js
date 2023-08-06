import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './Navbar.js';
<<<<<<< HEAD
import CalendarModule from './CalendarModule.js';
=======
import Calender from './Calender.js';
>>>>>>> parent of 17d5a4f (feat edit/add/delete lesson)
import Database from './Database.js';
import FinanceModule from './FinanceModule';
import LevelModule from './LevelModule';
import AddStudent from './AddStudent';
import AddFinance from './AddFinance';
import EditStudent from './EditStudent';
import EditFinance from './EditFinance';
<<<<<<< HEAD
import LessonsModule from './LessonsModule';
import AddLesson from './AddLesson';
import EditLesson from './EditLesson';
import PreviewLesson from './PreviewLesson';
=======
>>>>>>> parent of 17d5a4f (feat edit/add/delete lesson)

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
<<<<<<< HEAD
                        <Route path="/" element={<CalendarModule />} />
=======
                        <Route path="/" element={<Calender />} />
>>>>>>> parent of 17d5a4f (feat edit/add/delete lesson)
                        <Route path="/database" element={<Database />} />
                        <Route path="/finance/:id" element={<FinanceModule />} />
                        <Route path="/level/:id" element={<LevelModule />} />
                        <Route path="/add" element={<AddStudent />} />
                        <Route path="/addFinance/:id" element={<AddFinance />} />
                        <Route path="/edit/:id" element={<EditStudent />} />
                        <Route path="/editFinance/:studentId/:financeId" element={<EditFinance />} />
<<<<<<< HEAD
                        <Route path="/lessons/:id" element={<LessonsModule />}></Route>
                        <Route path="/addLesson/:id" element={<AddLesson />}></Route>
                        <Route path="/editLesson/:studentId/:lessonsId" element={<EditLesson />}></Route>
                        <Route path="/previewLesson/:studentId/:lessonsId" element={<PreviewLesson />}></Route>
                        <Route path="/education/:id" element={<EducationModule />} />
=======
>>>>>>> parent of 17d5a4f (feat edit/add/delete lesson)
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;