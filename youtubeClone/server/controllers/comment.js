import Comment from "../models/Comment.js"
import Video from "../models/Video.js";
import { createError } from "../utils/error.js";

export const addComment = async(req, res) => {
    //Specifico che il nuovo video ha come parametro userID, lo user id della req
    const newComment = new Comment({userId: req.user.id, ...req.body});
    try {
        const saveComment = await newComment.save();
        res.status(200).json(saveComment);
    } catch (err) {
        next(err);
    }
}


export const deleteComment = async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        //Verifichiamo che a modificare il video sia il suo creatore
        if(!req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id)
                
            res.status(200).json("Comment has been deleted!");
        }
        else return next(createError(404, "You can delete only your comments!"));
            
    } catch (err) {
        next(err);
    }
}



export const getComments = async(req, res) => {
    try {
        const comments = await Comment.find({videoId: req.params.videoId})
        res.status(200).json(comments);
    } catch (error) {
        
    }
}


