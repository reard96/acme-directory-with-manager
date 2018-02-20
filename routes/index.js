const app = require('express').Router();
const { Employee } = require('../db');

module.exports = app;

app.get('/', (req, res, next) => {
  // logic here
})

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
