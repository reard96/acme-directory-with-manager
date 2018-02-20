const conn = require('./conn');
const db = require('./db');
const { Employee, Job } = db.models;

const Employee = require('./Employee');
const Job = require('./Job');

const app = require('express').Router();

Employee.belongsTo(Job);
Job.hasMany(Employee);

const sync = () => {
  return conn.sync({ force: true });
};

const seed = () => {
  return Promise.all([
    Job.create({ name: 'Jr. Dev.' }),
    Job.create({ name: 'Sr. Dev.' }),
    Job.create({ name: 'Product Manager' }),
    Job.create({ name: 'CEO' }),
    Employee.create({ email: 'dan@acme.com' }),
    Employee.create({ email: 'karen@acme.com' }),
    Employee.create({ email: 'elizabeth@acme.com' }),
    Employee.create({ email: 'jojo@acme.com' })
  ])
  .then(([ jrDev, srDev, pm, ceo, dan, karen, elizabeth, jojo ]) => {
    return Promise.all([
      dan.setJob(ceo),
      karen.setJob(pm),
      elizabeth.setJob(jrDev),
      jojo.setJob(jrDev)
    ]);
  });
};

app.get('/employees', (req, res, next) => {
  Promise.all([
    Employee.findAll({
      include: [ Job ]
    }),
    Job.findAll({})
  ])
  .then(([employees, jobs]) => res.render('employees', { employees, jobs }))
  .catch(next);
});

app.post('/employees', (req, res, next) => {
  Employee.createFromForm(req.body)
    .then(() => res.redirect('/employees'))
    .catch(next);
});

module.exports = {
  app,
  sync,
  seed,
  models: {
    Employee,
    Job
  }
};
