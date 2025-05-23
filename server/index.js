require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const mailService = require('./service/mail-service');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await mailService.init();
        app.listen(PORT, () => {
            console.log('Server running on port 5000...');
        })
    } catch(e) {
        console.error(e);
    }
}

start();