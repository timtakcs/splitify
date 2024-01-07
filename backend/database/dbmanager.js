const pool = require('./database');
const bcrypt = require('bcrypt');

const dbManager = {
    async createUser(email, username, password) {
        try {
            const result = await pool.query(
                'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)',
                [username, password, email]
            );

            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async verifyUser(username, password) {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            );

            const user = result.rows[0];
            
            if (await bcrypt.compare(password, user.password) && !user.isplaceholder) {
                console.log("user found");
                return { found: true, id: user.id, username: user.username };
            } else {
                console.log("user not found");
                return { found: false };
            }
            
        } catch (error) {
            console.error('Error executing query', error.stack);
            throw error;
        }
    }
}

module.exports = dbManager;