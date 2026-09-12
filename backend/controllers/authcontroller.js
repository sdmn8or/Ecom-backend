const emailregx =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordregx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendVerificationEmail} = require('../utils/emailsender');

let registrationController = async (req, res) => {

    let{fullname, email, password, confirmpassword, terms}= req.body

    let existinguser = await User.findOne({email})

    if(existinguser){
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }

    if(!fullname || !email || !password || !confirmpassword || !terms){
       return res.status(400).json({
        success: false,
        message: "All fields are required"
       })
    }

    if(password !== confirmpassword){
        return res.status(400).json({
            success: false,
            message: "Password and Confirm Password do not match"
        })
    }


    if(!emailregx.test(email)){
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        })
    }

    if(fullname.length < 3){
        return res.status(400).json({
            success: false,
            message: "Fullname must be at least 3 characters long"
        })
    }
    if(fullname.length > 30){
        return res.status(400).json({
            success: false,
            message: "Fullname must be less than 30 characters long"
        })
    }

    if(!passwordregx.test(password)){
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        })
    }

    const hash = bcrypt.hashSync(password, 10);

    const user = new User({
        fullname,
        email,
        password: hash,
        terms
    })
    await user.save()

    let verificationToken = jwt.sign({
        _id:user.id,
        email:user.email,
        role:user.role
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    await sendVerificationEmail(user.email, verificationToken);
    console.log(verificationToken)

    

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
    })
}


let loginController = async (req, res) => {
    let {email, password} = req.body

    let existinguser = await User.findOne({email})

    if(!existinguser){
        return res.status(400).json({
            success: false,
            message: "User does not exist"
        })
    }

    if(!email || !password ){
       return res.status(400).json({
        success: false,
        message: "All fields are required"
       })
    }

     if(!emailregx.test(email)){
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        })
    }

    let passcompare=bcrypt.compareSync(password, existinguser.password);

    if(passcompare){
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: existinguser._id,
                fullname: existinguser.fullname,
                email: existinguser.email,
                role: existinguser.role
            }
        })
    }else{
        return res.status(400).json({
            success: false,
            message: "Invalid password"
        })
    }
}



let verifyEmailController = async (req, res) => {
    let {token} = req.query;

    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate({_id:decoded._id},{isVerified:true})
    res.status(200).json({
        
            success: true,
            message: "verified"
        
    })
}

module.exports = {registrationController, loginController, verifyEmailController}
