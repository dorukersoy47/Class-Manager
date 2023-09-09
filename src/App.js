import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Login from './Login';
import Navbar from './Navbar.js';
import PDF from './PDF.js';
import CalendarModule from './CalendarModule.js';
import Database from './Database.js';
import FinanceModule from './FinanceModule';
import AddStudent from './AddStudent';
import FreeTimes from './FreeTimes';
import AddFinance from './AddFinance';
import EditStudent from './EditStudent';
import EditFinance from './EditFinance';
import LessonsModule from './LessonsModule';
import AddLesson from './AddLesson';
import EditLesson from './EditLesson';
import PreviewLesson from './PreviewLesson';
import EducationModule from './EducationModule';
import EditEducation from './EditEducation.js';
import { addRecurringLesson } from './addRecurringLesson'; 

function App() {
	const [students, setStudents] = useState([]);
	const [authenticated, setAuthenticated] = useState(false);
    
	useEffect(() => {
        setAuthenticated(sessionStorage.getItem('authenticated') === 'true');
    }, []);

    useEffect(() => {
        sessionStorage.setItem('authenticated', authenticated);
    }, [authenticated]);

    useEffect(() => {
        axios.get('http://localhost:3001/getStudents')
            .then((result) => setStudents(result.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        addRecurringLesson(students);

        const intervalId = setInterval(() => {
            addRecurringLesson(students);
        }, 60000);

        return () => clearInterval(intervalId);
  }, [students]);

	return (
		<Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    {authenticated ? (
                        <Routes>
                            <Route path="/" element={<CalendarModule />} />
							<Route path="/database" element={<Database />} />
							<Route path="/finance/:id" element={<FinanceModule />} />
                            <Route path="/add" element={<AddStudent />} />
                            <Route path="freeTimes" element={<FreeTimes />} />
							<Route path="/addFinance/:id" element={<AddFinance />} />
							<Route path="/edit/:id" element={<EditStudent />} />
							<Route path="/editFinance/:studentId/:financeId" element={<EditFinance />} />
							<Route path="/lessons/:id" element={<LessonsModule />}></Route>
							<Route path="/addLesson/:id" element={<AddLesson />}></Route>
							<Route path="/editLesson/:studentId/:lessonsId" element={<EditLesson />}/>
							<Route path="/previewLesson/:studentId/:lessonsId" element={<PreviewLesson />}/>
                            <Route path="/education/:id" element={<EducationModule />} />
                            <Route path="/editEducation/:studentId/:educationId" element={<EditEducation />} />
                            <Route path="/pdf" element={ <PDF/>} />
                        </Routes>
                    ) : (
                        <Login setAuthenticated={setAuthenticated} />
                    )}
                </div>
			</div>
        </Router>
  	);
}

export default App;

