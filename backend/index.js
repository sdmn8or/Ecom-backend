require('node:dns').setServers(['1.1.1.1','8.8.8.8']);
require('dotenv').config();
const express = require('express');
const app = express();
const authRouter = require('./routes/authrouter');
const userrouter = require('./routes/userrouter');
const adminrouter = require('./routes/adminrouter');
const {adminmiddleware, usermiddleware} = require('./middlewares/rolemiddleware');
const mongodbconfig = require('./config/mongodbconfig');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

mongodbconfig();

app.use(express.json())

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user',usermiddleware, userrouter);
app.use('/api/v1/admin',adminmiddleware, adminrouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});