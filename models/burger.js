const orm = require('../config/orm.js');

const burger = {
    selectAll(cb) {
        orm.selectAll('burgers', (res) => cb(res));
    },
    create(cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, (res) => cb(res));
    },
    update(cols, condition, cb) {
        orm.updateOne('burgers', cols, condition, (res) => cb(res));
    },
};

module.exports = burger;