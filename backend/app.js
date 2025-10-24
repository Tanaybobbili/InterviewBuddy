const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/db');
const Organisation = require('./models/organisation');
const User = require('./models/user');

sequelize.authenticate().then(() => { console.log('DB connected!')});

sequelize.sync().then(() => { console.log('Database synced') }).catch((err) => { console.error('Error syncing database:', err); });  

const orgroutes = require('./routes/organisations');
const userroutes = require('./routes/users');

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());

app.use('/api/organisations', orgroutes);
app.use('/api/users', userroutes);


const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
