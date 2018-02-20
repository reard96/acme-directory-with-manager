const db = require('./db');
const { Employee } = db.models;

const express = require('express');
const app = express();
const path = require('path');

const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

app.use(require('body-parser').urlencoded());

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use(require('method-override')('_method'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

// so I can deliver the image file
app.use('/', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.path = req.url;
  next();
});

app.use((req, res, next) => {
  Employee.findAll({})
    .then(employees => {
      res.locals.employeeCount = employees.length;
      // const managerCount = employees.reduceRight((sum, employee) => {
      //   return sum + employee.nicknames.length;
      // }, 0);
      // res.locals.nicknameCount = nicknameCount;
      next();
    })
    .catch(next);
});

app.use('/', require('./routes/index.js'));

db.sync()
  .then(() => db.seed());
