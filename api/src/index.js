const cors = require("cors");
const express = require("express");
const { Op } = require("sequelize");

const {
  sequelize,
  Event,
  User,
  migrate,
  Vacation,
  EventParticipant,
  VacationParticipant,
} = require("./db/index.js");

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", async (_, res) => {
  const users = (await User.findAll()).map(({ dataValues }) => dataValues);

  res.send(
    users.map(({ id, username, name, email }) => ({
      id,
      username,
      name,
      email,
    }))
  );
});

app.post("/user", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    const user = await User.create({ username, name, email, password });

    if (!user) return res.sendStatus(401);
    res.status(201).send({ ...user.dataValues, password: "********" });
  } catch (_) {
    res.sendStatus(400);
  }
});

app.get("/user/:id/vacation", async (req, res) => {
  try {
    const { id } = req.params;

    const vacation = await Vacation.findOne({
      where: { creator: parseInt(id) },
    });

    if (vacation.dataValues) return res.send(vacation.dataValues);

    res.sendStatus(404);
  } catch (_) {
    res.sendStatus(400);
  }
});

app.get("/vacation/:id/events", async (req, res) => {
  try {
    const { id } = req.params;

    const events = (await Event.findAll({ where: { vacation: id } })).map(
      ({ dataValues }) => dataValues
    );

    if (!events.length) return res.sendStatus(404);

    res.send(events);
  } catch (e) {
    res.sendStatus(400);
  }
});

app.get("/vacation/:id/participants", async (req, res) => {
  try {
    const { id } = req.params;

    const p = (
      await VacationParticipant.findAll({ where: { vacation: id } })
    ).map(({ dataValues }) => dataValues);

    if (!p.length) return res.sendStatus(404);

    res.send(p);
  } catch (e) {
    res.sendStatus(400);
  }
});

app.post("/auth", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username,
        password,
      },
    });

    if (!user) return res.sendStatus(401);
    res.send({ ...user.dataValues, password: "********" });
  } catch (_) {
    res.sendStatus(400);
  }
});

app.post("/vacation", async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { creator, title, start, finish, events, participants } = req.body;

    if (!Array.isArray(events) || !Array.isArray(participants))
      throw new Error();

    const vacation = await Vacation.create(
      {
        title,
        creator,
        start: new Date(start).toISOString(),
        finish: new Date(finish).toISOString(),
      },
      {
        transaction,
      }
    );

    const vacationId = vacation.dataValues.id;

    if (participants.length) {
      for (const user of participants) {
        await VacationParticipant.create(
          { user, vacation: vacationId },
          { transaction }
        );
      }
    }

    if (events && events.length) {
      for (const { participants, ...rest } of events) {
        delete rest.id;
        const event = await Event.create(
          { ...rest, vacation: vacationId },
          { transaction }
        );

        if (participants && participants.length) {
          for (const user of participants) {
            console.log(user);
            await EventParticipant.create(
              {
                user,
                event: event.dataValues.id,
              },
              { transaction }
            );
          }
        }
      }
    }

    const savedEvents = await Event.findAll({
      where: {
        [Op.and]: [
          {
            vacation: {
              [Op.ne]: vacationId,
            },
          },
          { creator },
        ],
      },
      transaction,
    });

    for (const e of savedEvents) {
      const { id } = e.dataValues;

      console.log(id);
      await EventParticipant.destroy({
        force: true,
        cascade: true,
        where: { event: id },
        transaction,
      });

      await Event.destroy({
        force: true,
        cascade: true,
        where: { id },
        transaction,
      });
    }

    const vacationsToDelete = await Vacation.findAll({
      where: {
        [Op.and]: [
          {
            id: {
              [Op.ne]: vacationId,
            },
          },
          {
            creator,
          },
        ],
      },
      transaction,
    });

    for (const vacation of vacationsToDelete) {
      await vacation.destroy({ transaction });
    }

    await transaction.commit();

    res.send(vacation.dataValues);
  } catch (e) {
    console.log(e);
    await transaction.rollback();
    res.sendStatus(400);
  }
});

app.get("/vacations", async (_, res) => {
  const vacations = (await Vacation.findAll()).map(
    ({ dataValues }) => dataValues
  );

  res.send(vacations);
});

app.get("/events", async (_, res) => {
  const events = (await Event.findAll()).map(({ dataValues }) => dataValues);

  res.send(events);
});

app.get("/event/:id/participants", async (req, res) => {
  try {
    const { id } = req.params;

    const p = (await EventParticipant.findAll({ where: { event: id } })).map(
      ({ dataValues }) => dataValues
    );

    if (!p.length) return res.sendStatus(404);

    res.send(p);
  } catch (e) {
    res.sendStatus(400);
  }
});

app.listen(PORT, async () => {
  await migrate();
  console.log("[server] Database ready");
  console.log(`[server] Listening to port ${PORT}`);
});
