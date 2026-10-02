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

const vendorMiddleware = (req, res, next) => {
  const authorizationToken = req.headers.authorization;
  const token = authorizationToken.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Please enter your token",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS);

  if (decoded.role == "admin" || decoded.role == "vendor") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Unauthorized",
  });
};


module.exports = {adminmiddleware, usermiddleware,vendorMiddleware};