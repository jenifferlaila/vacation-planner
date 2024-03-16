const { DataTypes } = require('sequelize');

const sequelize = require('./instance.js');

const User = sequelize.define(
    'User',
    {
        id: {
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        username: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        email: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        password: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
    },
    {
        freezeTableName: true,
    },
);

module.exports = User;
