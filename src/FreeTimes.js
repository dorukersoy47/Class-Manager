import { useState, useEffect } from "react";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const FreeTimes = () => {
    const [lessons, setLessons] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStart, setSelectedStart] = useState("09:00");
    const [selectedEnd, setSelectedEnd] = useState("22:00");
    const [freeTimes, setFreeTimes] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        axios.get('http://localhost:3001/getStudents')
        .then((response) => {
            setLessons([].concat(...response.data.map(student => student.lessons)));
        })
        .catch((err) => console.log(err));
    }, []);

    const formTimeOptions = () => {
        const options = [];
        for (let i = 9; i <= 21; i++) {
            options.push(i.toString().padStart(2, '0') + ":00");
            options.push(i.toString().padStart(2, '0') + ":30");
        }
        return options;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const lessonTimesThatDay = [];
        lessons.forEach(lesson => {
            const lessonDate = new Date(lesson.date);
            const lessonStart = new Date(lesson.startTime);
            const lessonEnd = new Date(lesson.endTime);
    
            if (lessonDate.toDateString() === selectedDate.toDateString()) {
                while (lessonStart < lessonEnd) {
                    const formattedTime = lessonStart.getHours().toString().padStart(2, '0')
                        + ':' + lessonStart.getMinutes().toString().padStart(2, '0');
                    lessonTimesThatDay.push(formattedTime);
                    lessonStart.setMinutes(lessonStart.getMinutes() + 30);
                }
            }
        });
    
        const allSlots = formTimeOptions().map(slot => ({
            time: slot,
            free: !lessonTimesThatDay.includes(slot) && slot >= selectedStart && slot < selectedEnd
        }));
    
        let currentFreeTimeStart = null;
        const freeSlots = [];
    
        allSlots.forEach((slot, index) => {
            if (slot.free && currentFreeTimeStart === null) {
                currentFreeTimeStart = slot.time;
            } else if (!slot.free && currentFreeTimeStart !== null) {
                freeSlots.push(currentFreeTimeStart + " - " + slot.time);
                currentFreeTimeStart = null;
            } else if (slot.free && currentFreeTimeStart !== null && index === allSlots.length - 1) {
                freeSlots.push(currentFreeTimeStart + " - " + slot.time);
            }
        });
    
        setFreeTimes(freeSlots);
    };
    
    return (
        <div>
            <form className="studentForm" onSubmit={handleSubmit}>
                <label className="formLabel">
                    <input className="formInput" type="date" onChange={e => setSelectedDate(new Date(e.target.value))} />
                </label>
                <label className="formLabel">
                    <select className="formInput" onChange={e => setSelectedStart(e.target.value)}>
                        {formTimeOptions().map(time => <option key={time} value={time}>{time}</option>)}
                    </select>
                </label>
                <label className="formLabel">
                    <select className="formInput" onChange={e => setSelectedEnd(e.target.value)}>
                        {formTimeOptions().map(time => <option key={time} value={time}>{time}</option>)}
                    </select>

                </label>
                <button className="submitButton" type="submit">{t('findFreeTimes')}</button>
            </form>
            <h1 className="FreeTimesH1">{t('freeTimes')}</h1>
            <ul>
                {freeTimes.map(time =>
                    <li className="freeTimes" key={time}>{time}</li>
                )}
            </ul>
        </div>
    );
};

export default FreeTimes;
