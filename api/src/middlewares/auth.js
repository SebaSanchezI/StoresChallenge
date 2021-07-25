const jwt = require('jsonwebtoken');
const {AUTH_SECRET} = process.env;

const Auth = (req,res,next)=>{
    console.log('authorization',req.headers.authorization)
    //comprobar que exista token
    if(!req.headers.authorization){
        return res.status(401).json({msg: 'access denied.'})
        //return res.json({msg:'access denied.'})
    }else{
        //coprobar validez de token
        let token = req.headers.authorization.split(" ")[1];//extraigo la parte del token
        //comporbar validez del token
        jwt.verify(token,AUTH_SECRET,(err,decoded)=>{
            
            if(err){
                return res.status(511).json({msg:'Token decoding failed.',err})
            }
            next();
        }) 
    }
}

module.exports =  Auth;