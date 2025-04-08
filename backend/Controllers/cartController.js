import User from "../Models/userModel.js";

export const updateCart = async(req, res)=>{
    try {
        const {userId , cartItems} = req.body;
        await User.findByIdAndUpdate(userId, {cartItems});
        res.josn({success: true, message: "Cart Updated"})
    } catch (error) {
        console.log(error)
    }
}