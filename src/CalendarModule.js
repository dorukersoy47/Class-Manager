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
	
		useEffect(() => {
			axios.get('http://localhost:3001/getStudents')
		  		.then((users) => setStudents(users.data))
		  		.catch((err) => console.log(err));
	  	}, []);

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
