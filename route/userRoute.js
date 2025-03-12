const express = require('express');
const router=express.Router()
const User = require('../models/user');
const auth = require('../middleware/auth')
const { ObjectId } = require ('bson');
const { deleteUser, getUser, updateUser, AllService, addServices, deleteServices, myServices, updateUserInfo } = require('../controller/userController');

router.delete("/delete", auth, deleteUser)

router.get("/user", auth, getUser)

router.put("/update", auth, updateUserInfo)

router.put("/update/pass", auth, updateUser)

router.get("/service", auth, AllService)

router.post("/addService/:id", auth, addServices);

router.delete("/deleteService/:id", auth, deleteServices);

router.get("/myService", auth, myServices);

module.exports=router;