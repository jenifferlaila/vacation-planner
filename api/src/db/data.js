const users = [
  {
    username: "lorem_ipsum",
    name: "Lorem Ipsum",
    email: "lorem@ipsum.com",
    password: "Senha1",
  },
  {
    username: "user_1",
    name: "User 1",
    email: "lorem@ipsum.com",
    password: "Senha2",
  },
  {
    username: "jane_doe",
    name: "Jane Doe",
    email: "jane@ipsum.com",
    password: "Senha3",
  },
  {
    username: "john_doe",
    name: "John Doe",
    email: "john@ipsum.com",
    password: "Senha4",
  },
];

const vacations = [
  {
    creator: 2,
    title: "Vacation summer 24",
    start: new Date(),
    finish: new Date(),
  },
];

const vacationParticipants = [
  { vacation: 1, user: 3 },
  { vacation: 1, user: 4 },
];

const events = [
  {
    vacation: 1,
    creator: 1,
    title: "Beach party",
    start: new Date(),
    participants: [3, 4],
  },
];

const eventParticipants = [
  { event: 1, user: 3 },
  { event: 1, user: 4 },
];

module.exports = {
  users,
  vacations,
  vacationParticipants,
  events,
  eventParticipants,
};
