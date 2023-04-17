const JWT = require('jsonwebtoken')
const JWT_secret = "inotebooku$er";

const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"access denied"})
    }
    try{
    let data = JWT.verify(token ,JWT_secret)
    req.user = data.user
    next();
    }catch(error){
        res.status(401).send({error:"access denied"})
    }
}

module.exports = fetchuser;