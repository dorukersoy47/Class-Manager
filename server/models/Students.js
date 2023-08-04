const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, require: false },
    value: { type: Number, required: true },
    date: { type: Date, required: true }
});

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    parentOneName: { type: String, required: false },
    parentOneSurname: { type: String, required: false },
    parentTwoName: { type: String, required: false },
    parentTwoSurname: { type: String, required: false },
    birthDate: { type: Date, required: true },
    address: { type: String, required: true },
    citizenshipNumber: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
    finance: [FinanceSchema],
    level: { type: Number, required: true }
});

const StudentModel = mongoose.model("students", StudentSchema);
module.exports = StudentModel;