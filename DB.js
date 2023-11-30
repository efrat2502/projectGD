const users = [
  {
    id: 1,
    name: "efrat",
  },
  {
    id: 2,
    name: "bracha",
  },
];
module.exports = users;

const getUserNameById = (id) => {
  return users.filter((user) => user.id === id);
};
module.exports = getUserNameById;
