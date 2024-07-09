import app from './app.js'
import {config} from 'dotenv'
import connectionToDB from './config/db.js'
config()
const PORT=process.env.PORT
app.listen(PORT,async()=>{
    await connectionToDB()
    console.log(`App is running at http:localhost:${PORT}`);
})