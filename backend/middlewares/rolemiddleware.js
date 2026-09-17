const jwt = require('jsonwebtoken');


let adminmiddleware = (req, res, next) => {
    let authorizationtoken = req.headers.authorization;

    let token = authorizationtoken.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(decoded.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only."
        });
    }else {
        next();
    }
}


let usermiddleware = (req, res, next) => {
    let authorizationtoken = req.headers.authorization;

    if(!authorizationtoken) {
        return res.status(403).json({
            success: false,
            message: "You are not logged in"
        });
    }

    let token = authorizationtoken.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded) {
        return res.status(403).json({
            success: false,
            message: "You are not logged in"
        });
    }else {
        next();
    }
}

module.exports = {adminmiddleware, usermiddleware};