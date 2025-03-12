const express = require('express');
const router=express.Router()
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Service = require('../models/services');
const Dash = require('../models/dashboard');
const { ObjectId } = require ('bson');

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user[0]._id);
        if (user) {
            res.status(200).send({message: "user delete successfully"});
        } else {
            res.status(200).send({message: "user don't exist"});
        }
    } catch(err) {
        console.log(err);
    }
}

exports.getUser = async (req,res) => {
    const user = await User.findById(req.user[0]._id)
    if (user) {
        res.send({message: user})
    } else {
        res.status(404).send({message: "User not found"})
    }
}

exports.updateUser = async(req, res) => {
    const updated = req.body;
    const user = await User.findById(req.user[0]._id);
    let data = {};
    if (await bcrypt.compare(updated.old, user.password)) {
        if (updated.newpass === updated.confirmpass) {
            const hashed = await bcrypt.hash(updated.newpass, 10)
            data = {
                password: hashed,
            }
            try {
                const user = await User.findByIdAndUpdate(req.user[0]._id, {$set: data});
                if (user) {
                    res.status(200).send({message: "User update successfully"});
                } else {
                    res.status(404).send({message: "user don't exist"});
                }
            } catch(err) {
                console.log(err);
            }
        } else {
            res.status(401).send({message: "Passwords don't watch"});
        }
    } else {
        res.status(401).send({message: "Bad old password"});
    }
}

exports.updateUserInfo = async(req, res) => {
    const updated = req.body;
    const user = await User.findById(req.user[0]._id);
    let data = {};
    if (await bcrypt.compare(updated.password, user.password)) {
        data = {
            email : updated.email,
            username: updated.username,
        }
        try {
            const user = await User.findByIdAndUpdate(req.user[0]._id, {$set: data});
            if (user) {
                res.status(200).send({message: "User update successfully"});
            } else {
                res.status(404).send({message: "user don't exist"});
            }
        } catch(err) {
            res.status(401).send({message: "An user already exist with this email or username"});
        }
    } else {
        res.status(401).send({message: "Bad Password"});
    }
}

exports.AllService = async (req, res) => {
    try {
        const AllService = await Service.find();
        if (AllService.length == 0) {
            res.status(404).send({message: 'Service not found'})
        }
        res.status(201).send({message: AllService})
    } catch (error) {
        console.log(error);
        
    }
}

exports.addServices = async (req, res) => {
    const id = req.params.id;
    try {
        const serviceAdd = await Dash.create({
            user_id: req.user[0]._id,
            service_id: id
        });
        res.status(201).send({message: "Service Add to the Dash"})
    } catch(error) {
        console.log(error);
    }
} 

exports.deleteServices = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteAdd = await Dash.findByIdAndDelete(id);
        res.status(201).send({message: "Service delete from the Dash"})
    } catch(error) {
        console.log(error);
    }
} 

exports.myServices = async (req, res) => {
    try {
        const deleteAdd = await Dash.find({user_id: req.user[0]._id}).populate("service_id");
        res.status(201).send({message: deleteAdd})
    } catch(error) {
        console.log(error);
    }
}