const pool = require("./database");
const bcrypt = require("bcrypt");

const dbManager = {
    async createUser(email, username, password) {
        try {
            const result = await pool.query(
                "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING userid, username",
                [username, password, email]
            );

            return {
                userid: result.rows[0].userid,
                username: result.rows[0].username,
            };
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async verifyUser(username, password) {
        try {
            const result = await pool.query(
                "SELECT * FROM users WHERE username = $1",
                [username]
            );

            const user = result.rows[0];

            if (
                (await bcrypt.compare(password, user.password)) &&
                !user.isplaceholder
            ) {
                console.log("user found");
                return {
                    found: true,
                    id: user.userid,
                    username: user.username,
                };
            } else {
                console.log("user not found");
                return { found: false };
            }
        } catch (error) {
            console.error("Error executing query", error.stack);
            throw error;
        }
    },

    async getGroups(userId) {
        try {
            const result = await pool.query(
                `
                SELECT
                    G.GroupID, 
                    G.groupName
                FROM 
                    Groups G
                INNER JOIN 
                    GroupMembers GM ON G.GroupID = GM.GroupID
                WHERE 
                    GM.UserID = $1;
                `,
                [userId]
            );

            return result.rows;
        } catch (error) {
            console.error("Error executing query", error.stack);
            throw error;
        }
    },

    async createGroup(groupName, userId) {
        try {
            await pool.query("BEGIN");

            const groupInsertResult = await pool.query(
                "INSERT INTO Groups (groupName) VALUES ($1) RETURNING GroupID",
                [groupName]
            );
            const newGroupId = groupInsertResult.rows[0].groupid;

            await pool.query(
                "INSERT INTO GroupMembers (GroupID, UserID) VALUES ($1, $2)",
                [newGroupId, userId]
            );

            await pool.query("COMMIT");
        } catch (error) {
            await pool.query("ROLLBACK");
            throw error;
        }
    },

    async getMembers(groupId) {
        try {
            const query = `
                SELECT U.UserID AS id, U.username AS name
                FROM Users U
                JOIN GroupMembers GM ON U.UserID = GM.userID
                WHERE GM.groupID = $1;
            `;
            const values = [groupId];

            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async createTransation(groupId, name, amount, paidBy) { // need to edit transaction table to include a name
        try {
            const query = `
                INSERT INTO Transactions (groupID, paidBy, amount, name) VALUES ($1, $2, $3, $4) RETURNING *;
            `;
            const values = [groupId, paidBy, amount, name];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async getTransactions(groupId) {
        try {
            const query = `
                SELECT U.username AS paidByName, T.amount, T.name AS storeName
                FROM Transactions T
                JOIN Users U ON T.paidBy = U.UserID
                WHERE T.groupID = $1;
            `;
            const values = [groupId];

            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async createBalances(groupID, balances) {
        console.log(groupID, balances);

        balances.forEach(async (balance) => {
            try {
                const query = `
                INSERT INTO Balances (groupID, owedBy, owedTo, amount, settled) 
                VALUES ($1, $2, $3, $4, $5);                
                `;
                values = [groupID, balance.owedBy, balance.owedTo, balance.amount, false];

                await pool.query(query, values);
            } catch (error) {
                throw error;
            }
        });
    },

    async getActiveBalances(groupId) {
        try {
            const query = `
                SELECT BalanceID, owedBy, owedTo, amount
                FROM Balances
                WHERE groupID = $1 AND settled = FALSE;            
            `;
            const values = [groupId];

            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async addToGroup(userId, groupId) {
        try {
            const query = `
            INSERT INTO groupMembers (groupID, userId) 
            VALUES ($1, $2);                
            `;
            values = [groupId, userId];

            await pool.query(query, values);
        } catch (error) {
            throw error;
        };
    },
};

module.exports = dbManager;
