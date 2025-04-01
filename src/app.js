import express from 'express';
import { connectMongoDB } from './config/mongodb-config.js';


const app = express();

connectMongoDB();
    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
    console.log('Server is running on port 8080');});