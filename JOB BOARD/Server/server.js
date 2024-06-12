import app from './app.js'
import {config} from 'dotenv'
// import connectionToDB from './config/dbConnection.js'
import connectionToDB from './config/dbConnection.js'
config()
const PORT=process.env.PORT||5000
app.listen(PORT,async()=>{
    await connectionToDB()
    console.log(`App is runnig at http:localhost:${PORT}`);
})