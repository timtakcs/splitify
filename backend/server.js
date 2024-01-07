const express = require('express');
const cors = require('cors');
const pool = require('./database/database');
const ocrClient = require('./ocr_client');
const app = express();
const env = require('dotenv').config({ path: './keys.env' });
const bcrypt = require('bcrypt');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const createAllTables = require('./database/init-db');
const jwt = require('jsonwebtoken');
const dbManager = require('./database/dbmanager');

createAllTables();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.post('/api/login', async (req, res) => {
    try {
        const data = req.body;
        
        const result = await dbManager.verifyUser(data.username, data.password);

        if (result.found) {

            const token = jwt.sign(
                { userId: result.id, username: result.username },
                process.env.JWT_SECRET,
                { expiresIn: 86400}
            );

            res.status(200).json({token});
        } else {
            res.status(401).send('User not found');
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.post('/api/signup', async (req, res) => {
    try {
        const data = req.body;
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const result = await dbManager.createUser(data.email, data.username, hashedPassword);

        if (result) {
            res.status(201).json({ message: 'Account created.' });
        } else {
            res.status(400).json({ message: 'Could not create account.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.post('/api/receipts', upload.array('receipts'), async (req, res) => {
    try {
        const resultIDArray = await ocrClient.sendReceiptData(req.files);
        res.json({ message: "Successfully uploaded files", data: resultIDArray });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/get-receipts', async (req, res) => {
    try {
        console.log("got request");

        const data = await ocrClient.getReceiptData(req.body.resultIDs);

        console.log(data)

        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});