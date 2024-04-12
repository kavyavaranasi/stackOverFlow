import mongoose from 'mongoose';
import Questions from '../models/Questions.js';
//import mongoose from 'mongoose';

export const AskQuestion = async (req, res) => {
    const postQuestionData=req.body;
    const postQuestion=new Questions(postQuestionData);
    try{
        await postQuestion.save()
        res.status(200).json("Posted a question successfully")
    }
    catch(err){
        console.log(err)
        res.status(404).json("Failed to post question");
    }
};

export const getAllQuestions=async(req,res)=>{
    try{
        const questionsList=await Questions.find()
        res.status(200).json(questionsList)
    }
    catch(err){
        console.log(err)
        res.status(404).json("Failed to get all QUestions")
    }

}

export const deleteQuestion=async (req,res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).send("question unavailable")
    }
    try{
        await Questions.findByIdAndRemove(_id)
        res.status(200).json({message:"deleted successfully..."})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"failed to delete question..."})
    }
}

export const voteQuestion=async(req,res)=>{
    const {id:_id}=req.params;
    const {value,userId}=req.body;

    if (!mongoose.Types.ObjectId.isValid){
        return res.status(400).json("Question unavailable")
    }
    try{
        const question=await Questions.findById(_id);
        const upIndex=question.upVote.findIndex((id)=>id===String(userId))
        const downIndex=question.downVote.findIndex((id)=>id===String(userId))

        if (value=='upVote'){
            if (downIndex!==-1){
                question.downVote=question.downVote.filter((id)=> id!==String(userId))
            }
            if(upIndex ===-1){
                question.upVote.push(userId)
            }
            else{
                question.upVote=question.upVote,filter((id)=>id !== String(userId))
            }
        }
        else if (value === 'downVote')
        {
            if (upIndex!==-1){
                question.upVote=question.upVote.filter((id)=> id!==String(userId))
            }
            if(downIndex ===-1){
                question.downVote.push(userId)
            }
            else{
                question.downVote=question.downVote.filter((id)=>id !== String(userId))
            }
        }
        await Questions.findByIdAndUpdate(_id,question)
        res.status(200).json({message:"voted successfully.."})
    }
    catch(err){
        res.status(404).json({message:"Id not found"})
    }
}