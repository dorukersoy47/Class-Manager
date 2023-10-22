import axios from 'axios';

export const addRecurringLesson = async (students) => {
    const currentTime = new Date();
    //Repeating for each student
    for (const student of students) {
        //Repeating for each lesson
        for (const lesson of student.lessons) {
            //Checking if the lessons is completed in real time but seen as scheduled in the DB
            if (new Date(lesson.endTime) < currentTime && lesson.status === 'Scheduled') {
            lesson.status = 'Completed';

                //Checking if the lesson is reccurg
                if (lesson.recurring) {
                    //Creating a new lesson
                    const newLesson = {
                        ...lesson,
                        _id: undefined,
                        status: 'Scheduled',
                        recurring: true,
                        date: new Date(lesson.date).setDate(new Date(lesson.date).getDate() + 7),
                        startTime: new Date(lesson.startTime).setDate(new Date(lesson.startTime).getDate() + 7),
                        endTime: new Date(lesson.endTime).setDate(new Date(lesson.endTime).getDate() + 7),
                    };
                    //Adding the new lesson to the DB
                    await axios.post(`http://localhost:3001/addLessons/${student._id}`, newLesson);
                    //Define old lesson as not recurring
                    lesson.recurring = false;
                }
                //Edit the old lesson
                await axios.put(`http://localhost:3001/editLesson/${student._id}/${lesson._id}`, lesson);
            }
        }
    }
};
