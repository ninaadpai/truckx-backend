const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Driver = require('../models/Driver');

router.post('/savedriver', (req, res) => {
    Driver.findOne({
      licenseNo: req.body.driver.licenseNo,
      adminEmail: req.body.driver.adminEmail
    }).then(user => {
      if(user)
        res.json("Driver Exists");
        else {
          const newDriver = new Driver({
              firstName: req.body.driver.firstName,
              lastName: req.body.driver.lastName,
              dateOfBirth: req.body.driver.dateOfBirth,
              licenseNo: req.body.driver.licenseNo,
              email: req.body.driver.email,
              phoneNo: req.body.driver.phoneNo,
              licenseExpDate: req.body.driver.licenseExpDate,
              adminEmail: req.body.driver.adminEmail,
          });

          newDriver.save();

          Driver.find(
            {},
            function(err, result) {
              let drivers = [];
              if(err) console.log(err);
              else {
                for(let i =0; i<result.length; i++) {
                  if(result[i].adminEmail===req.body.driver.adminEmail)
                    drivers.push(result[i]);
                }
              res.json(drivers);
              }
            }
          )
        }
    })
});

router.post('/getdrivers', (req, res) => {
  Driver.find(
    {},
    function(err, result) {
      let drivers = [];
      if(err) console.log(err);
      else {
        for(let i =0; i<result.length; i++) {
          if(result[i].adminEmail===req.body.email)
            drivers.push(result[i]);
        }
      res.json(drivers);
      }
    }
  )
})

router.post('/deletedriver', (req,res) => {
  Driver.deleteOne({
    licenseNo: req.body.driver.licenseNo,
    adminEmail: req.body.driver.adminEmail,
  }, function(err, result) {
    if (err) console.log("err");
    else {
      Driver.find(
        {},
        function(err, result) {
          let drivers = [];
          if(err) console.log(err);
          else {
            for(let i =0; i<result.length; i++) {
              if(result[i].adminEmail===req.body.driver.adminEmail)
                drivers.push(result[i]);
            }
          res.json(drivers);
          }
        }
      )
    }
  })
})

module.exports = router;
