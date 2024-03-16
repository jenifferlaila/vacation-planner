const { DataTypes } = require("sequelize");

const sequelize = require("./instance.js");
const User = require("./user.js");
const { Vacation } = require("./vacation.js");

const Event = sequelize.define(
  "Event",
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
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: User,
      },
    },
    vacation: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: Vacation,
      },
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    start: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

const EventParticipant = sequelize.define(
  "EventParticipant",
  {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    event: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: Event,
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
  Event,
  EventParticipant,
};
