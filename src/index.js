import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/index.js';

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 4000;

connectDB()
    .then(() => {
        app.listen(3000, () => {
            console.log(`Server running on port ${PORT}! ^^`);
        });
    })
    .catch(err => console.log("mongo db connection error: " + err))

