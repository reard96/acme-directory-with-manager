const conn = require('./conn');
const { Sequelize } = conn;

const Employee = conn.define('employee', {
  email: {
    type: Sequelize.STRING
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

module.exports = Employee;
