const {User, Store} = require('../db');
const bcrypt = require('bcrypt');


const getStores = async (req,res)=>{

    try {
        const stores = await Store.findAll(
            { attributes: ['id','name','address','city','postal_code','image']}
        );
        res.status(200).json({  message: 'Successful query',
                    count:stores.length,
                    stores});
    } catch (error) {
        console.log( error)
        res.status(500).json({message: 'There was a problem on the server'})
    }
    
}

const getUsers = async (req,res)=>{

    const id = req.params.id;
                    try {
                        //devuelve usuarios de una tienda
                        const users = await User.findAll({ 
                            attributes: [
                                'id',
                                'name',
                                'last_name',
                                'user_name',
                                'email',
                                'password',
                                'profile',
                            ],
                                where:{
                                    store_id:id,
                                }
                            });
                        
                    if(users.length === 0) return res.send('no users of this store.');
                    //setear las contraseñas par que la vea el admin
                    //users.map(user=>user.password = bcrypt.)
                    res.json({  message: 'Successful query',
                                users_quantity:users.length,
                                users});
                    } catch (error) {
                        console.log(error)
                        res.sendStatus(500,{message: 'There was a problem on the server'})
                    }
                }


const getStats = async (req,res)=>{

    const id = req.params.id;
    try {
        //devuelve usuario de una tienda
        const users = await User.findAll({ 
            attributes: [
                'id',
                'store_id',
                'profile',
            ],
                where:{
                    store_id:id,
                }
            });
        
        let count = 0;
        for(let i=0;i<users.length;i++){
            if(users[i].profile === 'cajero') ++count;
        }

        const stats = {
            total_users:users.length,
            cashier:count,
            supervisor:users.length-count,
            porcent_cashier:((count/users.length)*100),
            porcent_supervisor:(((users.length-count)/users.length)*100)
        };
        res.status(200).json({stats});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'There was a problem on the server'})
    }

}



module.exports = {
    getStores,
    getUsers,
    getStats
}