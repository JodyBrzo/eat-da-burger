const orm = require('../config/orm.js');

const butger = {
    selectAll(cb) {
        orm.selectAll('burgers', cols, vals, (res) => cb(res));
    },
    create(cols, vals cb) {
        orm.insertOne('burgers' cols, vals (res) => cb(res));
    },
    
};


module.exports = burger;