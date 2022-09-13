const axios = require('axios');
const { response } = require('express');
const validator = require('../helper/validator');
module.exports = {
  supers: (req, res, next) => {
    data.filter(d => validator.alphabet(d.jurisdiction));
    res.status(200).json(data.filter(d => validator.alphabet(d.jurisdiction)));
  },

  allSupervisors: (req, res) => {
    axios
      .get(
        'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers'
      )
      .then(response => {
        for (let num in response.data) {
          if (parseInt(response.data[num].jurisdiction)) {
            response.data.splice(num, 1);
          }
        }
        sortByKey = keys => {
          return (a, b) => {
            key = keys[0];
            return keys.length == 0
              ? 0
              : a[key] < b[key]
              ? -1
              : a[key] > b[key]
              ? 1
              : sortByKey(keys.slice(1))(a, b);
          };
        };
        response.data.sort(
          sortByKey(['jurisdiction', 'lastName', 'firstName'])
        );
        res
          .status(200)
          .json(response.data.filter(d => validator.alphabet(d.jurisdiction)));
      })
      .catch(err => {
        console.log(err);
      });
  },
  create: async (req, res, next) => {
    let requestParams = {
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      supervisor: req.body.supervisor,
    };

    if (!validator.alphabet(requestParams.firstName)) {
      console.log('Invalid first name');
      res.status(400).json({ message: 'invalid first name' });
    } else if (!validator.alphabet(requestParams.lastName)) {
      console.log('Invalid last name');
      res.status(400).json({ message: 'invalid last name' });
    } else if (
      requestParams.phoneNumber !== 'Not Checked' &&
      !validator.phoneNumber(requestParams.phoneNumber)
    ) {
      console.log('Invalid Param for phone');
      res.status(400).json({ message: 'invalid phone' });
    } else if (
      requestParams.email !== 'Not Checked' &&
      !validator.email(requestParams.email)
    ) {
      console.log('Invalid Param for email');
      res.status(400).json({ message: 'invalid email' });
    } else if (requestParams.supervisor == '') {
      console.log('Invalid Param for supervisor');
      res.status(400).json({ message: 'No Selection' });
    } else {
      console.log(requestParams);
      res.status(200).json({ message: 'success' });
    }
    next();
  },
};
