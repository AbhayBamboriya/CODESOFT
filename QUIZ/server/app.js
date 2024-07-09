import express from 'express'
import cors from 'cors'
import cookieParser  from 'cookie-parser'
import morgan from 'morgan';
import userRoutes from './Routes/UserRoutes.js'
import QuizRoutes from './Routes/QuizRoutes.js'

import bodyParser from 'body-parser'
import errorMiddleware from './middleware/error.middleware.js';
const app=express()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:true}))       
app.use(morgan('dev'))  
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));

app.use(cookieParser()) 
app.use('/ping',function(req,res){
    res.send('/pong')
})
app.use('/user',userRoutes)
app.use('/quiz',QuizRoutes)
app.all('*',(req,res)=>{
    res.status(404).send('OOPS!!! 404 page not found')
})
app.use(errorMiddleware)
export default app
