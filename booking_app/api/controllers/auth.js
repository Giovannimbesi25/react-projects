import User from "../models/User.js"
import bcrypt from "bcryptjs/dist/bcrypt.js";
import {createError} from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const  register = async (req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save()
        res.status(201).send("User ha benn created successfully");
    }catch(err){
        next(err)
    }
}

export const login = async (req, res, next) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        if(!user) return next(createError(404, "User not found"));

        const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!passwordCorrect) return next(createError(400, "Invalid password"));

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT );

        const { password, isAdmin, ...otherDetails} = user._doc;
        //httpOnly specifies whether or not the cookie should be accessible via JavaScript in the browser.
        res.cookie("access_token", token, { 
            httpOnly: true,
        }).status(201).json({...otherDetails});

    }catch(err){
        next(err)
    }
}