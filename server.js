const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

// Configure multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Adjust the directory as needed
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

app.use(cors());

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.post('/send-pdf', upload.single('pdfFile'), (req, res) => {
    const pdfUrl = 'http://localhost:3000/path-to-uploaded-pdf';  
    res.json({ pdfUrl });
});

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
