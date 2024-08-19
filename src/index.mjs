import express from 'express';
import mysql from 'mysql2';
import { environments } from './environments/environment.mjs';
import router from './api/authenticationApis.mjs';

const app=express();
app.use('/api',router);
const port = 44356;
export const db=mysql.createConnection({
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