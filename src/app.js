import express from 'express';
import { connectMongoDB } from './config/mongodb-config.js';
import router from './routes/router.js';


const app = express();

connectMongoDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", router);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});