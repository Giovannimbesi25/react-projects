import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err); 
  }
};

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({name: req.body.name});
        if(!user) return next(createError(404, "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) return next(createError(404, "Password incorrect"));

        const token = jwt.sign({id: user._id},  process.env.JWT);

        const {password, ...otherDetails} = user._doc

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(otherDetails);

    } catch (err) {
        next(err);
    }
};


export const googleAuth = async (req, res, next) => {
    try {
      //Se siamo già resgistrati, restituiamo il cookie e le info sull'user
      const user = await User.findOne({email: req.body.email});
      if(user) {
        console.log("C'è l'utente")
        const token = jwt.sign({id: user._id},  process.env.JWT);

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(user._doc);
      }
      //Altrimenti lo dobbiamo inserire nel db
      else{
        console.log("L'utente non esiste")

        const newUser = new User({
          ...req.body, fromGoogle: true
        })

        const savedUser = await newUser.save();
        const token = jwt.sign({id: savedUser._id},  process.env.JWT);

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(savedUser._doc);

      }
    } catch (err) {
        next(err);
    }
};