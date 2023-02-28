const asyncHandler = require('express-async-handler');
const db = require('../../../services/database');
const { ErrorResponse, SuccessResponse } = require("../../../helpers/response");
const authUtils = require('../utils/auth');
const { ObjectId } = require('mongodb');

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password){
            throw new Error('INVALID_FIELD')
        }
        if (password.length <= 8){
            throw new Error('INCORRECT_PASSWORD_LENGTH')
        }
        const userExists = await db.collection('Users').findOne({email});
        // console.log(userExists);
        if(userExists){
            throw new Error('ALREADY_EXISTS')
        }
        const hashedPassword = authUtils.generateHash(password);
        const result = await db.collection('Users').insertOne({'full_name': fullName, "email": email, 'password': hashedPassword});
        const token = authUtils.generateToken({'_id': result.insertedId, 'email': email, 'password': hashedPassword});
        const obj = new SuccessResponse({"result": {'token': token }})
        res.status(obj.status_code).send(obj.response);
        
    } catch (err) {
        const obj  = new ErrorResponse(err);
        res.status(obj.status_code).send(obj.response);
    }
});

const getUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const user = await db.collection('Users').find({'_id': new ObjectId(id)}).project({'password': 0}).toArray();
        if(!user){
            throw new Error('NOT_FOUND')
        }
        const obj = new SuccessResponse({'users': user });
        res.status(obj.status_code).send(obj.response);
    } catch (err) {
        const obj  = new ErrorResponse(err);
        res.status(obj.status_code).send(obj.response);
    }
});

const getUsers = asyncHandler(async (req, res) => {
    try {
        const userList = await db.collection('Users').find({})
        .project({'password': 0})
        .sort({'full_name': 1})
        .allowDiskUse(true).toArray();
        const obj = new SuccessResponse({'users': userList });
        res.status(obj.status_code).send(obj.response);
    } catch (err) {
        const obj  = new ErrorResponse(err);
        res.status(obj.status_code).send(obj.response);
    }
});


const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { full_name, email} = req.body;
    try {
        let updateQuery = {};
        if (full_name){
            updateQuery['full_name'] = full_name;
        }
        if (email){
            updateQuery['email'] = email;
        }
        await db.collection('Users').findOneAndUpdate({'_id': new ObjectId(id)}, 
        {'$set': updateQuery});
        const obj = new SuccessResponse('success');
        res.status(obj.status_code).send(obj.response);
    } catch (err) {
        const obj  = new ErrorResponse(err);
        res.status(obj.status_code).send(obj.response);
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        await db.collection('Users').deleteOne({'_id': new ObjectId(id)});
        const obj = new SuccessResponse('success');
        res.status(obj.status_code).send(obj.response);
    } catch (err) {
        const obj  = new ErrorResponse(err);
        res.status(obj.status_code).send(obj.response);
    }
});

module.exports = {registerUser, getUser,
    getUsers,
    updateUser,
    deleteUser,}