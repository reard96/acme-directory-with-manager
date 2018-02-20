const conn = require('./conn');
const { Sequelize } = conn;

const Employee = conn.define('employee', {
  email: {
    type: Sequelize.STRING,
    // better to validate here, or in hmtl form? both?
    validate: {
      isEmail: true
    }
  }
}, {
    getterMethods: {
      name: function() {
        const noCaps = this.email.split('@')[0];
        // capitalize first letter of name
        return noCaps.charAt(0).toUpperCase() + noCaps.slice(1);
      },
      emailProvider: function() {
        const dotCom = this.email.split('@')[1];
        // remove .com; capitalize
        return dotCom.split('.')[0].charAt(0).toUpperCase() + dotCom.split('.')[0].slice(1);
      }
    }
});

Employee.createFromForm = function(body) {
  if (body.jobId === '-1') {
    delete body.jobId;
  }
  return this.create(body);
};

module.exports = Employee;
