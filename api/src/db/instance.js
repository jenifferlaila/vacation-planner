const { Sequelize } = require('sequelize');
const { join } = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: join(__dirname, '..', '..', 'vacation_planner.sqlite'),
});

module.exports = sequelize;
