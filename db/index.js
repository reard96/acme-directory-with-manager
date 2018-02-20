const conn = require('./conn');

const Employee = require('./Employee');
const Job = require('./Job');

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
  // })
  // .then(() => {
  //   return Job.findOne({
  //     where: {
  //       name: 'Jr. Dev.'
  //     },
  //     include: [
  //       Employee
  //     ]
  //   });
  // })
  // .then(job => {
  //   console.log(job.employees.map(employee => employee.email).join(', '));
  });
};

module.exports = {
  sync,
  seed,
  models: {
    Employee,
    Job
  }
};
