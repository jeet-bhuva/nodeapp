var express = require('express');
var bcrypt = require("bcrypt");
// var jwt = require('jsonwebtoken');


// models
const User = require('../Models/userModel');

const Register = async (req, res) => {
    try {

        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(404).json({
                error: "Please Enter All Field..!"
            });

        }
        const emailexit = await User.findOne({ email: email });
        if (emailexit) {
            return res.status(404).json({ message: "Email Already Exist" });
        }

        var hash = bcrypt.hashSync(password, 10);
        const data = await User({
            username: username,
            password: hash,
            email: email,
        });

        await data.save();
        return res.status(200).json({ message: "User Created Succesfully..!" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Something went wrong..!" });
    }
};

const Login = async (req,res) => {
    try {
        
        const{username , password} = req.body;
        if(!username || !password){
            return res.status(404).json({
                error:"Please Enter The Field...!"
            });
        }

       const userData = await User.findOne({username : username});
       if(!userData){
        return res.status(404).json({message: "Username is incorrect...!"})
       };

       const userCompare = await bcrypt.compare(req.body.password, userData.password);
       if(!userCompare){
        return res.status(404).json({message: "Password is incorrect...!"});
       };

       await userData.save();
        return res.status(200).json({
            message: "User Login SuccessFully...!",
        });


    } catch (error) {
        return res.status(404).json({error: "There was an error"});
    }
}

module.exports = { Register, Login };