const pool = require('./database');

const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Users (
            UserID SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            isPlaceholder BOOLEAN default false
        );
    `;
    await pool.query(query);
};

const createGroupsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Groups (
            GroupID SERIAL PRIMARY KEY,
            groupName VARCHAR(255) NOT NULL
        );
    `;
    await pool.query(query);
};

const createGroupMembersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS GroupMembers (
            groupID INT,
            userID INT,
            FOREIGN KEY (groupID) REFERENCES Groups(GroupID),
            FOREIGN KEY (userID) REFERENCES Users(UserID),
            PRIMARY KEY (groupID, userID)
        );
    `;
    await pool.query(query);
};

const createTransactionsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Transactions (
            TransactionID SERIAL PRIMARY KEY,
            groupID INT,
            paidBy INT,
            amount FLOAT NOT NULL,
            FOREIGN KEY (groupID) REFERENCES Groups(GroupID),
            FOREIGN KEY (paidBy) REFERENCES Users(UserID)
        );
    `;
    await pool.query(query);
};

const createBalancesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Balances (
            BalanceID SERIAL PRIMARY KEY,
            groupID INT,
            owedBy INT,
            owedTo INT,
            amount FLOAT NOT NULL,
            settled BOOLEAN NOT NULL,
            FOREIGN KEY (groupID) REFERENCES Groups(GroupID),
            FOREIGN KEY (owedBy) REFERENCES Users(UserID),
            FOREIGN KEY (owedTo) REFERENCES Users(UserID)
        );
    `;
    await pool.query(query);
};

const createAllTables = async () => {
    await createUsersTable();
    await createGroupsTable();
    await createGroupMembersTable();
    await createTransactionsTable();
    await createBalancesTable();
    console.log('All tables created or already exist');
};

module.exports = createAllTables;
