import express from 'express'
// import cors from 'cors'
// import cookieParser  from 'cookie-parser'
import morgan from 'morgan';
// import errorMiddleware from './middleware/errorMiddleware.js';
import router from './Routes/Routes.js';
const app=express()
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))
app.use(morgan('dev')) 
// app.use(cors({
//     origin:[process.env.FRONTEND_URL],
//     credentials:true
// }));
// console.log('xddk'); 
// app.use(cookieParser())
app.use('/ping',function(req,res){
    res.send('/pong')
})
// console.log('xcks');

app.use('/api',router)
app.all('*',(req,res)=>{
    res.status(404).send('OOPS!!! 404 pakkge not found')
})
// app.use(errorMiddleware)
export default app