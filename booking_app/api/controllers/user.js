import User from "../models/User.js"

//Already have a function to create user , the registration function in auth.js

export const updateUser = async(req, res , next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        res.status(200).json(updatedUser);
    } catch (err){
        rnext(err);
    }
}


export const getUser = async(req, res , next) => {
    try {
        const findedUser = await User.findById(req.params.id);
        res.status(200).json(findedUser);
    } catch (err){
        next(err);
    }
}



export const deleteUser = async(req, res , next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted");
    } catch (err){
        next(err);
    }
}

export const getUsers = async(req, res , next) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (err){
        next(err)
    }
}