const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./models/Students');
const config = require('./config.js');

const app = express()
app.use(cors())
app.use(express.json())

//connect to db
mongoose.connect("mongodb://127.0.0.1:27017/cs_ia_classmanager")

//authentication
app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;
    
    if (username === config.USERNAME && password === config.PASSWORD) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

//get student array
app.get('/getStudents', (req, res) => {
    StudentModel.find()
    .then(users => res.json(users))
    .catch(err => res.json({ error: err }));
})

//get single student by id
app.get('/getStudent/:id', (req, res) => {
    StudentModel.findById(req.params.id)
    .then(student => res.json(student))
    .catch(err => res.json({ error: err }));
});

//add student
app.post('/addStudent', (req, res) => {
    const newStudent = new StudentModel(req.body);
    newStudent.save()
    .then(() => res.json({ message: 'Student created' }))
    .catch(err => res.json({ error: err }));
});

//edit student info
app.put('/editStudent/:id', (req, res) => {
    const id = req.params.id;
    const newStudentData = req.body;

    StudentModel.findByIdAndUpdate(id, newStudentData, { new: true })
    .then(student => {
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    })
    .catch(err => res.status(500).json({ error: err }));
});

//delete student 
app.delete('/deleteStudent/:id', (req, res) => {
    StudentModel.findByIdAndRemove(req.params.id)
    .then(result => {
        if (result) {
            res.status(200).send({ message: 'Student deleted' });
        } else {
            res.status(404).send({ message: 'Student not found' });
        }
    })
    .catch(err => res.status(500).json({ error: err }));
});

//add lesson
app.post('/addLessons/:id', (req, res) => {
    const { id } = req.params;
    const newLesson = req.body;

    StudentModel.findOneAndUpdate(
        { _id: id },
        { $push: { lessons: newLesson } },
        {new: true, useFindAndModify: false}
    )
    .then(student => res.json(student))
    .catch(err => res.json({ error: err }));
});

//edit lesson
app.put('/editLesson/:studentId/:lessonId', (req, res) => {
    const { studentId, lessonId } = req.params;
    const updatedLesson = req.body;

    StudentModel.findOneAndUpdate(
        { _id: studentId, 'lessons._id': lessonId },
        { $set: { 'lessons.$': updatedLesson } },
        { new: true, useFindAndModify: false }
    )
    .then(student => res.json(student))
    .catch(err => res.json({ error: err }));
});

//delete lesson
app.delete('/deleteLesson/:studentId/:lessonId', (req, res) => {
    const { studentId, lessonId } = req.params;

    StudentModel.findOneAndUpdate(
        { _id: studentId },
        { $pull: { lessons: { _id: lessonId } } },
        { new: true, useFindAndModify: false }
    )
    .then(student => res.json(student))
    .catch(err => res.json({ error: err }));
});

//get transactions
app.get('/getFinance/:id', (req, res) => {
    StudentModel.findById(req.params.id)
    .then(student => {
        if(student) {
            res.json(student.finance);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    })
    .catch(err => res.json({ error: err }));
});

//add transaction
app.post('/addFinance/:id', (req, res) => {
    const { id } = req.params;
    const newFinance = req.body;

    StudentModel.findOneAndUpdate(
        { _id: id },
        { $push: { finance: newFinance } },
        { new: true, useFindAndModify: false }
    )
    .then(student => res.json(student))
    .catch(err => res.json({ error: err }));
});

//edit transaction
app.put('/editFinance/:studentId/:financeId', (req, res) => {
    const { studentId, financeId } = req.params;
    const updatedFinance = req.body;

    StudentModel.findOneAndUpdate(
        { _id: studentId, 'finance._id': financeId },
        { $set: { 'finance.$': updatedFinance } },
        { new: true, useFindAndModify: false }
    )
    .then(student => res.json(student))
    .catch(err => res.json({ error: err }));
});

//delete transaction
app.delete('/deleteFinance/:studentId/:financeId', (req, res) => {
    const { studentId, financeId } = req.params;

    StudentModel.findOneAndUpdate(
        { _id: studentId },
        { $pull: { finance: { _id: financeId } } },
        { new: true, useFindAndModify: false }
    )
    .then(student => res.json(student))
    .catch(err => res.json({ error: err }));
});

//get education
app.get('/getEducation/:id', (req, res) => {
    StudentModel.findById(req.params.id)
    .then(student => {
        if(student) {
            res.json(student.education);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    })
    .catch(err => res.json({ error: err }));
});

//edit education
app.put('/editEducation/:studentId/:educationId', (req, res) => {
    const { studentId, educationId } = req.params;
    const updatedEducation = req.body;

    StudentModel.findOneAndUpdate(
        { _id: studentId, 'education._id': educationId },
        { $set: { 'education.$': updatedEducation } },
        { new: true, useFindAndModify: false }
    )
    .then(student => res.json(student))
    .catch(err => res.json({ error: err }));
})

//running server
app.listen(3001, () => {
    console.log("Server is running")
})