require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const connectDatabase = require('./database/connectDatabase.js');
const authRouter = require('./routes/auth.js');
const deptRouter = require('./routes/department.js');

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/hello', (req, res, next) => {

    res.send('Hello there')

    next();
})

app.use('/api/auth', authRouter);
app.use('/api/department',deptRouter);
app.use('/', express.static('../frontend/build'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
})

const port = process.argv[2] || 3035;

connectDatabase()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening to http requests on http://localhost:${port}`)
    })
})