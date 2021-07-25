const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate:{
                isEmail:{
                    msg:'email must be valid.'
                }
            }
        },
        password:{
            type: DataTypes.STRING,
            //allowNull: false, para que no de error al actualizar ya que no se cambia puede cambiar la password
            validate:{
                len:{
                    args:[6,255],
                    msg:'password must have a minimum of 6 characters.'
                }
            }
        },
        profile:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type: DataTypes.STRING,
        },
        store_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
},
{ timestamps: false }
);

}