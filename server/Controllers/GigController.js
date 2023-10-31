import Gig from "../Models/Gig.js"
import createError from "../Utils/CreateError.js"

export const createGig = async(req,res,next) =>{
    if(!req.isSeller) return next(createError(403,"Only sellers can create gigs fam."))

    const newGig = new Gig({
        userId : req.userId,
        ...req.body,
    })

    try {
        const savedGig = await newGig.save()
        res.status(201).json(savedGig)
    } catch (error) {
        console.log(error)
    }
}

export const deleteGig = async(req,res,next) =>{
    try {
        const gig = await Gig.findById(req.params.id)
        if(gig.userId !== req.userId) return next(createError(403,"You can't delete other's gigs fam"))

        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("Gig has been deleted. ")
    } catch (error) {
        next(error)
    }
}

export const getGig = async(req,res,next) =>{
    try {
        const gig = await Gig.findById(req.params.id)
        if(!gig) next(createError(404,"Gig doesn't exist fam"))
        res.status(200).send(gig)
    } catch (error) {
        next(error)
    }
}


export const getGigs = async(req,res,next) =>{

    const q = req.query
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: { $regex: q.cat, $options: "i" } }), // Use case-insensitive regex
        ...((q.min || q.max) && { price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) } }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } })
      };
      
    try {
        const gigs = await Gig.find(filters).sort({[q.sort]: -1})
        res.status(200).send(gigs)

    } catch (error) {
        next(error)
    }
}


