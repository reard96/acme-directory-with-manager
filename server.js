const db = require('./db');
const { Employee, Job } = db.models;

const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

const express = require('express');
const app = express();

app.use(require('body-parser').urlencoded());

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

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
  // this breaks if email address has no '@' !!!
  Employee.create(req.body)
    .then(() => res.redirect('/employees'))
    .catch(next);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

db.sync()
  .then(() => db.seed());
