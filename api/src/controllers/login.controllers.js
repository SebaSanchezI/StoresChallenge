const {User} = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const authConfig = require('../config/auth')
const {AUTH_SECRET,AUTH_EXPIRES} = process.env;


//iniciar sesion
const singIn = async (req,res)=>{
    const {login, password} = req.body;
    //identificar si es mail o username
    let user;
    if(login.toLowerCase().indexOf('@') === -1) { //busca por username
        user = await User.findOne({
            where:{user_name:login}
        })
    }else{
        //busca por email
        user = await User.findOne({
            where:{email:login.toLowerCase()}
        })
    }

    if(!user) {
        return res.status(404).json({message:'User not found.'});
    }else{
        //valido que la contraseña coincida
        if(bcrypt.compareSync(password,user.password)){
            //crear token
            const token = jwt.sign( { user: user },
                                    AUTH_SECRET,
                                    {expiresIn:AUTH_EXPIRES});
            res.json({
                user,
                token
            });
        }else{
            return res.status(401).json({message:"Incorrect password."});
        }
    }
}

module.exports={
    singIn
}