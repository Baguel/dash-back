const express = require('express');
const router=express.Router()
const User = require('../models/user');
const Service = require('../models/services');
const bcrypt = require('bcrypt');

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
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
    const id = req.params.id;
    const user = await User.findById(id)
    if (user) {
        res.send({message: user})
    } else {
        res.status(404).send({message: "User not found"})
    }
}

exports.getallUser = async (req,res) => {
    const user = await User.find({username: {$ne: "admin"}})
    if (user) {
        res.send({message: user})
    } else {
        res.status(404).send({message: "User not found"})
    }
}

exports.updateUser = async(req, res) => {
    const id = req.params.id;
    const updated = req.body;
    let data = {};
    if (updated.password) {
        const hashed = await bcrypt.hash(updated.password, 10)
        data = {
            ...updated,
            password: hashed,
        }
    } else {
        data = {
            ...updated,
        }
    }
    try {
        const user = await User.findByIdAndUpdate(id, {$set: data});
        if (user) {
            res.status(200).send({message: "User update successfully"});
        } else {
            res.status(200).send({message: "user don't exist"});
        }
    } catch(err) {
        console.log(err);
    }
}

exports.createServices = async(req, res) => {
    
    try {
        const newService = {
            name: req.body.name,
            picture: req.file.path,
        }
        await Service.create(newService)
        res.status(201).send({message: 'success'})
    } catch (error) {
        console.log(error);
        
    }
}

exports.getService = async (req, res) => {
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