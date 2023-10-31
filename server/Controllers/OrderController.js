import createError from "../Utils/CreateError.js"
import Order from "../Models/Order.js"
import Gig from "../Models/Gig.js"

export const createOrder = async (req, res) => {
    try{
        const gig = await Gig.findById(req.params.gigId)

        const newOrder = new Order({
            gigId: gig._id,
            img: gig.cover,
            title: gig.title,
            price: gig.price,
            sellerId: gig.userId,
            buyerId: req.userId,
            payment_intent: "temporary"
        })

        await newOrder.save()
        res.status(200).send("Order has been created")
    }catch(error){
        console.log(error)
    }


}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
            isCompleted: true
        })
        
        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
    }
}