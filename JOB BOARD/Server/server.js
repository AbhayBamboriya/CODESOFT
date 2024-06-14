import app from './app.js'
import {config} from 'dotenv'
import connectionToDB from './config/dbConnection.js'
import cloudinary from 'cloudinary'
config()
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
const PORT=process.env.PORT||5000
app.listen(PORT,async()=>{
    await connectionToDB()
    console.log(`App is running at http:localhost:${PORT}`);
})