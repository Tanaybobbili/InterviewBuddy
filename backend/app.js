    const express = require('express');
    const app = express();
    require('dotenv').config();
    const cors = require('cors');
    const sequelize = require('./config/db');
    const Organisation = require('./models/organisation');
    const User = require('./models/user');
    (async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
        await sequelize.sync();
        console.log('Database synced');
    } catch (err) {
        console.error('Database connection failed:', err);
    }
    })();

    const orgroutes = require('./routes/organisations');
    const userroutes = require('./routes/users');

    app.use(cors({origin: 'http://localhost:3000', credentials: true}));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.use('/api/organisations', orgroutes);
    app.use('/api/users', userroutes);


    const PORT = process.env.PORT || 8000;

    app.get('/', (req, res) => {
        res.send('Hello from the backend!');
    });

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
