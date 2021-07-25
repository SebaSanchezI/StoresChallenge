const {User, Store} = require('../db');
const bcrypt = require('bcrypt');

const getAllUsers = async (req,res)=>{

    try {
    const users = await User.findAll(
            {   attributes: [
                    'id','name','last_name','user_name','profile',
                    'email','password','store_id'],
                include:{
                    model: Store,
                    attributes:['name']
                }
            });
        
        res.status(200).json({  message: 'Successful query',
            count:users.length, 
            users});
    } catch (error) {
        console.log( error)
        res.status(500).json({message: 'There was a problem on the server'})
    }
}

const postUser = async (req,res)=>{
    let {name, last_name,user_name, email,password,profile,image,store_id} = req.body;
    //pasar datos a minuscula
    email = email.toLowerCase();
    try {
        //validar que los datos existan
        if (!name || !last_name || !user_name || 
            !email || !password || !profile || !store_id) return res.status(400).json({  message:'Data cannot be empty'});
        //validar que el mail no exista
        const validateEmail = await User.findOne({
            where:{email}
        })
        if(validateEmail) return res.json({  message:'The email already exists.'})
        //validar password
        if(password.length<6) return res.json({  message:'password must have a minimum of 6 characters.'});
        //encriptar password
        password = bcrypt.hashSync(password,10);
        //formateo todo a miniscula
        name = name.toLowerCase();
        last_name = last_name.toLowerCase();
        user_name = user_name.toLowerCase();
        profile = profile.toLowerCase();
        let newUser = await User.create({
            name,
            last_name,
            user_name,
            email,
            password,
            profile,
            image,
            store_id
        })

        res.status(201).json({
            message:'user created successfully',
            newUser:newUser
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'There was a problem on the server', error: err})
    }
};

const getUser = async (req,res)=>{
    let id = req.params.id;
    try {
        if (!id ) return res.status(400).json({  message:'ID cannot be empty'});
        const user = await User.findByPk(id);
        if(!user) return res.status(404).json({  message:'User not found'});
        res.status(200).json({  message:'user finded successfully',
                                user})
    } catch (err) {
        console.log(err)
        res.status(500).json({  message: 'There was a problem on the server', 
                                error: err });
    }
};

const putUser = async (req,res)=>{
    let {id,name, last_name,user_name,email,profile,store_id} = req.body;
        
    try {
        if (!name || !last_name || !user_name || !id ||
            !email || !profile || !store_id) return res.status(400).json({  message:'Data cannot be empty'});
        //encriptar password
        //password = bcrypt.hashSync(password,10);// no se usa porque es update
        name = name.toLowerCase();
        last_name = last_name.toLowerCase();
        user_name = user_name.toLowerCase();
        email = email.toLowerCase();
        profile = profile.toLowerCase();
        id = Number(id);
        await User.update({
            name,
            last_name,
            user_name,
            email,
            //password, para que no se modifique la password
            profile,
            store_id
        },
        {where:{id}
        })
        res.status(200).json({message:'user updated successfully'})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'There was a problem on the server', err});
    }
};

const deleteUser = async (req,res)=>{
    let id = req.params.id;
    if(!id || id < 1) return res.status(404).json({  message:'Wrong ID'});
    id = Number(id);
    try {
        const deletedUser = await User.destroy({
        where:{id}
        })
        //retorna true si elimino
        res.status(200).json({message:`user deleted successfully`})
    } catch (err) {
        res.status(500).json({message: 'There was a problem on the server', error: err})
    }
};

module.exports = {
    getAllUsers,
    postUser,
    getUser,
    putUser,
    deleteUser
}