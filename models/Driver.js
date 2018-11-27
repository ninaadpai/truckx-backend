
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  licenseNo: {
    type: String,
    required: true
  },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    licenseExpDate: {
        type: Date,
        required: true
    },
    adminEmail: {
      type: String,
      required: true
    }
});

const Driver = mongoose.model('drivers', DriverSchema);

module.exports = Driver;
