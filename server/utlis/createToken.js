const jwt = require("jsonwebtoken");

const generateRegisterToken = (res, userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY)
    res.cookie("jwtRegister", token, {
        httpOnly:true,
        secure:process.env.NODE_ENV == "development",
        samesite:"strict",
        // maxAge:30*24*60*1000
    })

    return token;
}

const generateLoginToken = (res, userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY,{
        expiresIn:"30d"
    })

    // res.cookie("LoginToken", token, {
    //     httpOnly:true,
    //     secure:process.env.NODE_ENV == "development",
    //     samesite:"strict",
    //     maxAge:30*24*60*1000
    // })
    return {token};
}


const forgetPasswordTokenVerify = (res, userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn:"5m"});

        return token;
}


module.exports = { generateRegisterToken, generateLoginToken, forgetPasswordTokenVerify };