let User = require("../models/userSchema"); 

let alluserscontroller = async (req, res) => {
    let users = await User.find({}).select("-password");

    res.status(200).json({
        success: true,
        message : `${users.length} users found`,
        data : users
    });
}

let singleusercontroller = async (req, res) => {
    let{id} = req.params;
    let data = await User.findById({_id:id}).select("-password");

    res.status(200).json({
        success: true,
        message : `user found`,
        data : data
    });
}


let activeusercontroller = async (req, res) => {
    let data = await User.find({status: 'active'}).select("-password");

    res.status(200).json({
        success: true,
        message : `active users found`,
        data : data
    });

}

let deactiveusercontroller = async (req, res) => {
    let data = await User.find({status: 'deactive'}).select("-password");

    res.status(200).json({
        success: true,
        message : `deactive users found`,
        data : data
    });
}

let updateusercontroller = async (req, res) => {
    let {id} = req.params;

    let data = await User.findByIdAndUpdate({_id:id}, req.body, {new:true}).select("-password");

    res.status(200).json({
        success: true,
        message : `user updated`,
        data : data
    });
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {alluserscontroller,singleusercontroller,activeusercontroller,deactiveusercontroller,updateusercontroller,deleteUser};