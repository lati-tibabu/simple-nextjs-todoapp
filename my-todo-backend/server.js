require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const taskRoutes = require('./routes/tasks');


const app = express();
const port =  process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/task', taskRoutes);

app.get('/', (req, res) => {
    res.send("Backend is running");
});

app.listen(port, async() => {
    console.log(`Server is running on port ${port}`);
    try{
        await sequelize.authenticate();
        console.log("Database is connected");
    } catch (error){
	console.error('Unable to connect to database', error);
    }
});
