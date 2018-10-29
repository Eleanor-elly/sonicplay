import express from 'express';
import bodyParser from 'body-parser';
import logger from './core/logger/app-logger'
import cors from 'cors'
import morgan from 'morgan'

import config from './core/config/config'
import connectToDb from "./db/connect";
import boardRoute from './routes/board.route'
import contentsRoute from './routes/contents.route'
import userRoute from './routes/user.route'

const port = config.serverPort;
logger.stream = {
    write : function(message, encoding){
        logger.info(message);
    }
};

connectToDb();

const app = express();
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

app.get('/index', (req, res)=>{
    res.send("hi");
});

app.use('/contents', contentsRoute);
app.use('/board', boardRoute);
app.use('/user', userRoute);


app.listen(port, () => {
    logger.info('Server started : ', port);
});
