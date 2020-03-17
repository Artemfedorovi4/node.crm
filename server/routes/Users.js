const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { User, Empl, Role } = require("../models/index");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
  // const today = new Date()
  const userData = {
    LOGIN: req.body.LOGIN,
    EMP_ID: req.body.EMP_ID,
    PASSWORD: req.body.PASSWORD
  };
  User.findOne({
    where: {
      LOGIN: req.body.LOGIN
    }
  })
    .then(user => {
      if (!user) {
        // bcrypt.hash(req.body.PASSWORD, 10, (err, hash) => {
        userData.PASSWORD = req.body.PASSWORD;
        User.create(userData)
          .then(user => {
            res.json({ status: user.LOGIN + " Registered!" });
          })
          .catch(err => {
            res.send("error: " + err);
          });
        // })
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    where: {
      LOGIN: req.body.LOGIN
    },
    include: [
      {
        model: Empl,
        include: [Role]
      }
    ]
  })
    .then(user => {
      if (user && req.body.PASSWORD === user.PASSWORD) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: '2 days'
        });
        // console.log(user.dataValues)
        let role = user.employee.roles_ref.ROLE_DESC;
        res.send({ auth: true, token: token, user: user.LOGIN, role: role });
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

users.get("/profile", (req, res) => {
  // console.log(req.headers["authorization"])
  let decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  )
  User.findOne({
    where: {
      LOGIN: decoded.LOGIN, 
    },
    include: [{
      model: Empl,
      include: [{
        model: Role,
        attributes: ['ROLE_DESC']
      }],
      attributes: ['LAST_NAME', 'FIRST_NAME']
    }]
  }).then(user => {
    if (user) {
      // user.employee = user.employee.LAST_NAME
      // console.log(user)
      res.json(user);
    } else {
      res.send("User does not exist");
    }
  }).catch(err => {
    res.send("error: " + err);
  });
});

users.post("/emploeers", (req, res) => {
  Empl.findAll({
    include: [
      {
        model: Role
        // required: true
      }
    ]
  })
    .then(emploeers => {
      const res_obj = emploeers.map(emploeer => {
        return Object.assign(
          {},
          {
            empl_id: emploeer.USER_ID,
            role: emploeer.roles_ref.ROLE_DESC,
            last_name: emploeer.LAST_NAME,
            first_name: emploeer.FIRST_NAME,
            email: emploeer.EMAIL,
            phone_number: emploeer.TEL_NUM
          }
        );
      });
      res.json(res_obj);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = users;
