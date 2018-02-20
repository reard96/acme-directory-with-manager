const conn = require('./conn');
const { Sequelize } = conn;

const Job = conn.define('job', {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = Job;
