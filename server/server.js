const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./models/Students')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/classmanager")

app.get('/getStudents', (req, res) => {
  StudentModel.find()
    .then(users => res.json(users))
    .catch(err => res.json({ error: err }));
})

app.get('/getStudent/:id', (req, res) => {
  StudentModel.findById(req.params.id)
    .then(student => res.json(student))
    .catch(err => res.json({ error: err }));
});


app.post('/addStudent', (req, res) => {
  const newStudent = new StudentModel(req.body);
  newStudent.save()
    .then(() => res.json({ message: 'Student created' }))
    .catch(err => res.json({ error: err }));
});

app.delete('/deleteStudent/:id', (req, res) => {
  StudentModel.findByIdAndRemove(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).send({ message: 'Student deleted' });
      } else {
        res.status(404).send({ message: 'Student not found' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    });
});


app.listen(3001, () => {
  console.log("Server is running :)")
})
