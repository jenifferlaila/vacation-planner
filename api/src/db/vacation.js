const { DataTypes } = require("sequelize");

const sequelize = require("./instance.js");
const User = require("./user.js");

const Vacation = sequelize.define(
  "Vacation",
  {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    creator: {
      allowNull: false,
      references: {
        key: "id",
        model: User,
      },
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    start: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    finish: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

const VacationParticipant = sequelize.define(
  "VacationParticipant",
  {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    vacation: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: Vacation,
      },
    },
    user: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: User,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Vacation,
  VacationParticipant,
};
