const mysqlConnection = require('../config/db');

const doQueryInsert = (query, params, res) => {
    mysqlConnection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error inserting data');
        } else {
            res.status(200).send(`Task "${params[0]}" has been successfully added`);
        }
    });
}

const doQueryDelete = (query, params, res) => {
    mysqlConnection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error deleting task');
        } else {
            if (results.affectedRows > 0) {
                res.status(200).send(`Task with ID ${params[0]} has been successfully deleted`);
            } else {
                res.status(404).send('Task not found');
            }
        }
    });
}

const doQueryPatch = (query, params, res) => {
    mysqlConnection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error updating task');
        } else {
            if (results.affectedRows > 0) {
                res.status(200).send(`Task with ID ${params[1]} has been successfully updated`);
            } else {
                res.status(404).send('Task not found');
            }
        }
    });
}

const doQueryGet = (query, res) => {
    mysqlConnection.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(result);
        }
    });
}

module.exports = {
    doQueryInsert,
    doQueryDelete,
    doQueryPatch,
    doQueryGet
}
