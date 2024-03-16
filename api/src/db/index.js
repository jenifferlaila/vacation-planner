const { DataTypes } = require('sequelize');

const sequelize = require('./instance.js');
const User = require('./user.js');
const { Vacation, VacationParticipant } = require('./vacation.js');
const { Event, EventParticipant } = require('./event.js');

const { users, vacations, vacationParticipants, events, eventParticipants } = require('./data.js');

const Meta = sequelize.define(
    'Meta',
    {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        ready: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
        },
    },
    {
        freezeTableName: true,
    },
);

async function migrate() {
    await sequelize.sync();

    const ready = (await Meta.findOne({ where: { id: 1 } }));

    if (ready) return;

    for (const user of users) {
        await User.create(user);
    }

    for (const vacation of vacations) {
        await Vacation.create(vacation);
    }

    for (const vp of vacationParticipants) {
        await VacationParticipant.create(vp);
    }

    for (const event of events) {
        await Event.create(event);
    }

    for (const ep of eventParticipants) {
        await EventParticipant.create(ep);
    }

    await Meta.create({ ready: true });
}

module.exports = {
    sequelize,
    migrate,
    Event,
    EventParticipant,
    User,
    Vacation,
    VacationParticipant,
};
