import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr';
import 'moment/locale/tr'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CalendarModule = () => {
	const [students, setStudents] = useState([]);
	const { t } = useTranslation();
	const localizer = momentLocalizer(moment);
    const navigate = useNavigate();
	
	function getCurrentLanguage() {
		return localStorage.getItem('language') || 'en';  
	}
	const currentLanguage = getCurrentLanguage();
	moment.locale(currentLanguage);

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

	const localMessages = {
		allDay: t('Bütün Gün'), 
		previous: t('Önceki'),
		next: t('Sonraki'),
		today: t('Bugün'),
		month: t('Ay'),
		week: t('Hafta'),
		day: t('Gün'),
		agenda: t('Ajanda'),
		date: t('Tarih'),
		time: t('Zaman'),
		event: t('Ders')
	};    

  	return (
		<div className="Calendar" key="currentLanguage">
      		<Calendar
				localizer={localizer}
                events={formatLessonsForCalendar()}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
				onSelectEvent={handleClick}
				messages={currentLanguage === 'tr' ? localMessages : {}}
			/>
        </div>
    );
};

export default CalendarModule;
