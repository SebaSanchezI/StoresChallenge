const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('store', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isAlpha:{
                    msg:'name only accepts letters.'
                },
                len:{
                    args:[2,255],
                    msg:'minimum characters two.'
                }
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        postal_code:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false,
        }   
},
{ timestamps: false }
);

}