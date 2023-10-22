import { useState, useEffect } from "react";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const FreeTimes = () => {
    //Parameters
    const [lessons, setLessons] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStart, setSelectedStart] = useState("09:00");
    const [selectedEnd, setSelectedEnd] = useState("22:00");
    const [freeTimes, setFreeTimes] = useState([]);
    const { t } = useTranslation();

    //Getting all students
    useEffect(() => {
        axios.get('http://localhost:3001/getStudents')
        .then((response) => {
            //Filling the lessons array with all lesson object of students
            setLessons([].concat(...response.data.map(student => student.lessons)));
        })
        .catch((err) => console.log(err));
    }, []);

    //Forming the time options into an array (9-22)
    const formTimeOptions = () => {
        const options = [];
        for (let i = 9; i <= 21; i++) {
            options.push(i.toString().padStart(2, '0') + ":00");
            options.push(i.toString().padStart(2, '0') + ":30");
        }
        return options;
    };

    //Handling the submit button
    const handleSubmit = (e) => {
        e.preventDefault();
    
        //An empty array to be filled up with lesson times that day
        const lessonTimesThatDay = [];
        lessons.forEach(lesson => {
            const lessonDate = new Date(lesson.date);
            const lessonStart = new Date(lesson.startTime);
            const lessonEnd = new Date(lesson.endTime);
            
            //Check if selected date is equal to the lesson objects data
            if (lessonDate.toDateString() === selectedDate.toDateString()) {
                //While the starting time is before the end time
                while (lessonStart < lessonEnd) {
                    const formattedTime = lessonStart.getHours().toString().padStart(2, '0')
                        + ':' + lessonStart.getMinutes().toString().padStart(2, '0');
                    //Pushes the time into full times
                    lessonTimesThatDay.push(formattedTime);
                    //Increments the starting time 30 minutes
                    lessonStart.setMinutes(lessonStart.getMinutes() + 30);
                }
            }
        });
    
        //Defining a new array named allSlots which defines the empty times
        const allSlots = formTimeOptions().map(slot => ({
            time: slot,
            free: !lessonTimesThatDay.includes(slot) && slot >= selectedStart && slot < selectedEnd
        }));
    
        let currentFreeTimeStart = null;
        const freeSlots = [];
    
        //Fill the freeSlots with objects spanning the free times in the format of  (start time - end time)
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
    
    //UI
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
