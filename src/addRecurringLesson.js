import axios from 'axios';

export const addRecurringLesson = async (students) => {
    const currentTime = new Date();
    for (const student of students) {
        for (const lesson of student.lessons) {
            if (new Date(lesson.endTime) < currentTime && lesson.status === 'Scheduled') {
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
};
