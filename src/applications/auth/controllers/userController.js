const asyncHandler = require('express-async-handler');
const db = require('../../../services/database');
const { ErrorResponse, SuccessResponse } = require("../../../helpers/response");

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;
    try {
        if (!fullName || !email || !password || !image){
            throw new Error('INVALID_FIELD')
        }
        const userExists = await db.collection('Users').findOne({email});
        console.log(userExists);
        if(userExists){
            throw new Error('ALREADY_EXISTS')
        }
        await db.collection('Users').insertOne({'fullname': fullName, "email": email});
        res.send(new SuccessResponse({"data": { fullName, email, password, image }}))
        
    } catch (err) {
        res.send(new ErrorResponse(err));
    }
});

const getUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const userExists = await User.findOne({email});
        if(userExists){
            throw new Error('ALREADY_EXISTS')
        }
        
        res.send(new SuccessResponse({message: `Create contact with ${fullName}`}));
    } catch (err) {
        res.send(new ErrorResponse(error));
    }
});

const getUsers = asyncHandler(async (req, res) => {
    try {
        const userList = await User.find({}).toArray();
        res.send(new SuccessResponse({"data": userList}));
    } catch (err) {
        res.send(new ErrorResponse(error));
    }
});


const updateUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const userExists = await User.findOne({email});
        if(userExists){
            throw new Error('ALREADY_EXISTS')
        }
        
        res.send(new SuccessResponse({message: `Create contact with ${fullName}`}));
    } catch (err) {
        res.send(new ErrorResponse(error));
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const userExists = await User.findOne({email});
        if(userExists){
            throw new Error('ALREADY_EXISTS')
        }
        
        res.send(new SuccessResponse({message: `Create contact with ${fullName}`}));
    } catch (err) {
        res.send(new ErrorResponse(error));
    }
});

module.exports = {registerUser, getUser,
    getUsers,
    updateUser,
    deleteUser,}