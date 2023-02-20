const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
const userRouter = require('./src/applications/auth/routes/userRouter');
const {errorHandler} =  require('./src/middlewares/errorHandler')

app = express();

// app.use(cors);
app.use(express.json());

// error handler
app.use(errorHandler);

app.use("/api/auth", userRouter);

// db inititialize

app.listen(config.SERVER_PORT, ()=>{
    console.log(`server is running on ${config.SERVER_PORT} port`);
});

