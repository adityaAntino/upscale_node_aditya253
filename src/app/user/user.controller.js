const router = require('express').Router()
const userSchema = require("../authentication/auth.schema")
const User = require("../authentication/auth.schema")

///GET-USER-DETAILS
exports.getUserDetails = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "User details fetched successfully",
            status: 200,
            user: req.user,
        });
    } catch (error) {
        console.log(`Get User Details Error ${error}`)
        res.status(500).json({ message: "Failed to get user details" });
    }
}


///UPDATE-USER-DETAILS
exports.updateUserDetails = async (req, res, next) => {
    const userSchema = req.body;
    try {
        ///Check if the request is null or not
        if (!Object.values(userSchema).length || req.user._id == null) {
            return res.status(400).json({
                message: "Failed to Update User details",
                status: 400,
            });
        } else {
            ///Updating user detail
            const updateUser = await User.findByIdAndUpdate(req.user._id, userSchema, {
                new: true,
            });

            ///Check if user is availble in DB
            if (updateUser) {
                return res.status(200).json({
                    message: "Updated User details successfully",
                    status: 200,
                    user: req.user,
                    query: req.body
                });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }

        }

    } catch (error) {
        console.log('Update User Detail Error ${error}', error)
        res.status(500).json({ message: "Failed to update user details", error: error });
    }
}


///DELETE-USER
exports.deleteUser = async (req, res, next) => {
    const userId = req.user._id;
    try {
        if (userId == null) {
            return res.status(404).json({ error: 'User not found' });
        }else{
            const userDeleted = await User.findByIdAndRemove(userId);
            if(userDeleted){
                return res.status(200).json({
                    message: "User Deleted Successfully",
                    status: 200,
                });
            }else{
                return res.status(400).json({
                    message:"Failed to delete user",
                    status:400
                });
            }
        }
    } catch (error) {
        console.log('Delete User Error', error)
        res.status(500).json({ message: "Failed to delete user", error: error });
    }
}