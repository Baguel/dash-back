const express = require('express');
const router=express.Router()
const User = require('../models/user');
const isadminAuth = require('../middleware/isadminauth')
const auth = require('../middleware/auth');
const { ObjectId } = require ('bson');
const { deleteUser, getUser, updateUser, createServices, getService, getallUser } = require('../controller/adminController');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})

const upload = multer({ storage: storage });

router.delete("/delete/:id", auth, isadminAuth, deleteUser)

router.get("/user/:id", auth, isadminAuth, getUser)

router.put("/update/:id", auth, isadminAuth, updateUser)

router.post("/addservices", upload.single("file"), createServices)

router.get("/getservices", auth, isadminAuth, getService)

router.get("/getUser", auth, isadminAuth, getallUser)

module.exports=router;