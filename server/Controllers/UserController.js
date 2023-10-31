import User from "../Models/User.js"
import createError from "../Utils/CreateError.js"

export const deleteUser = async(req,res,next) =>{

    const user = await User.findById(req.params.id)
        if(req.userId !== user._id.toString()){
            res.status(403).next(createError(403,"You can only delete your own account"))
        }
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send("Deteled")
    }


    //write a function that will get the user
    export const getUser = async(req,res,next) =>{
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    }
    