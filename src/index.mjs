import express from 'express';
import mysql from 'mysql2';
import { environments } from './environments/environment.mjs';
import router from './api/authenticationApis.mjs';
import cors from 'cors';
import bodyParser from 'body-parser';

const app=express();
app.use(cors({
  origin: 'http://localhost:50496', // Replace this with the frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',router);
const port = 44356;
export const db= await mysql.createConnection({
    host:'localhost',
    user:'root',
    password:`${environments.DB_Pass}`,
    database:`${environments.DB_Name}`
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });

  app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
  })