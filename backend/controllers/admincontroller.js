let User = require("../models/userSchema"); 

let alluserscontroller = async (req, res) => {
    let users = await User.find({}).select("-password");

    res.status(200).json({
        success: true,
        message : `${users.length} users found`,
        data : users
    });
}

module.exports = {alluserscontroller};