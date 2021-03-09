const connection = require('./connection.js');

const orm = {
    //selectAll()
    selectAll(table, cb) {
        const queryString = `SELECT * FROM ${table};`;
        connection.query(queryString, (err, res) => {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },

    //insertOne()
    insertOne(table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table}`;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        connection.query(queryString, vals, (err, res) => {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },

    //updateOne()
    updateOne(table, cols, condition, cb) {
        let queryString = `UPDATE ${table}`;

        queryString += ' SET ';
        queryString += objToSql(cols);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
        if (err) {
            throw err;
        }

        cb(result);
        });
    },
};

const printQuestionMarks = (num) => {
    const arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push('?');
    }
  
    return arr.toString();
  };

  const objToSql = (ob) => {
    const arr = [];
  
    // Loop through the keys and push the key/value as a string int arr
    for (const key in ob) {
      let value = ob[key];
      // Check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // If string with spaces, add quotations 
        if (typeof value === 'string' && value.indexOf(' ') >= 0) {
          value = `'${value}'`;
        }
        arr.push(`${key}=${value}`);
      }
    }
    return arr.toString();
};

module.exports = orm;
