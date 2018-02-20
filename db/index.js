const conn = require('./conn');
const Employee = require('./Employee');
const Manager = require('./Manager');

Employee.belongsTo(Manager);
Manager.hasMany(Employee);

const sync = () => {
  return conn.sync({ force: true });
};

const seed = () => {
  return Promise.all([
    Employee.create({ email: 'dan@acme.com' }),
    Employee.create({ email: 'karen@acme.com' }),
    Employee.create({ email: 'elizabeth@acme.com' }),
    Employee.create({ email: 'jojo@acme.com' })
  ])
  .then(([ dan, karen, elizabeth, jojo ]) => {
    return Promise.all([
      dan.setManager(karen),
      elizabeth.setManager(karen),
      jojo.setManager(dan)
    ]);
  });
};

module.exports = {
  sync,
  seed,
  models: {
    Employee,
    Manager
  }
};
