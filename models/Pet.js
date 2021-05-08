const {Model, Datatypes} = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

Pet.init(
    {
    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    
    breed: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    name: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    weight: {
        type: Datatypes.INTEGER,
        allowNull: false,
    },
    disability: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    age: {
        type: Datatypes.INTEGER,
        allowNull: false,
    },
    zip_code: {
        type: Datatypes.INTEGER,
        allowNull: false,
    }
    
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'pets',
      }
    );

module.exports = Pet;