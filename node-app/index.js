const express = require("express");
const app = express();
const db = require('./config/db')
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRoute = require('./route/authroute');
const userRoute = require('./route/userRoute');
const adminRoute = require('./route/adminroute');
const cors = require('cors');
const axios = require('axios');

const corsOpts = {
    'Access-Control-Allow-Origin': '*',
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
    ],
};

app.use(cors(corsOpts));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use("/uploads", express.static('uploads'))

// app.get("/github/auth", (req, res) => {
//   res.redirect(`https://github.com/login/oauth/authorize?client_id=Ov23liE3ANP7Mg7L7wV4`);
// })

// app.get("/github/callback/", (req, res) => {
//   axios.post("https://github.com/login/oauth/access_token", {
//       client_id: "Ov23liE3ANP7Mg7L7wV4",
//       client_secret: "3c5a54806b9b6cf81bf306c5c4daf7d7ec5afb5d",
//       code: req.query.code
//   }, {
//       headers: {
//           Accept: "application/json"
//       }
//   }).then((result) => {
//       console.log(result)
//       res.send("you are authorized " + result.data.access_token)
//   }).catch((err) => {
//       console.log(err);
//   })
// })

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`);
})