import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';
import { useNavigate } from 'react-router-dom';


const CalendarModule = () => {
  	const [students, setStudents] = useState([]);
    const localizer = momentLocalizer(moment);
    const navigate = useNavigate();

	const fetchStudents = () => {
		axios
		  .get('http://localhost:3001/getStudents')
		  .then((users) => setStudents(users.data))
		  .catch((err) => console.log(err));
	  };
	
	  useEffect(() => {
		fetchStudents();
	  }, []);
	
	  const createRecurringLessons = async () => {
		const currentTime = new Date();
		for (const student of students) {
		  for (const lesson of student.lessons) {
			if (
			  new Date(lesson.endTime) < currentTime &&
			  lesson.status === 'Scheduled'
			) {
			  lesson.status = 'Completed';
	
			  if (lesson.recurring) {
				const newLesson = {
					...lesson,
					_id: undefined,
					status: 'Scheduled',
					recurring: true,
					date: new Date(lesson.date).setDate(new Date(lesson.date).getDate() + 7),
					startTime: new Date(lesson.startTime).setDate(new Date(lesson.startTime).getDate() + 7),
					endTime: new Date(lesson.endTime).setDate(new Date(lesson.endTime).getDate() + 7),
				};
				await axios.post(`http://localhost:3001/addLessons/${student._id}`, newLesson);
				lesson.recurring = false;
			  }
			  await axios.put(`http://localhost:3001/editLesson/${student._id}/${lesson._id}`, lesson);
			}
		  }
		}
		fetchStudents();
	  };
	
	  useEffect(() => {
		const intervalId = setInterval(() => {
		  createRecurringLessons();
		}, 60000);
	
		return () => clearInterval(intervalId);
	  }, [students]);
  

  const handleClick = (event) => {
        navigate(`/previewLesson/${event.studentId}/${event.id}`)
    }

    const formatLessonsForCalendar = () => {
        const lessonsForCalendar = [];
        students.forEach(student => {
          student.lessons.forEach(lesson => {
            lessonsForCalendar.push({
              id: lesson._id,
              title: student.name + ' ' + student.surname + ' - ' + lesson.instrument,
              start: new Date(lesson.startTime),
              end: new Date(lesson.endTime),
              studentId: student._id
            });
          });
        });
        return lessonsForCalendar;
      };
      

  return (
        <div className="Calendar">
      <Calendar
        
                localizer={localizer}
                events={formatLessonsForCalendar()}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                onSelectEvent={handleClick}
            />
        </div>
    );
};

export default CalendarModule;
