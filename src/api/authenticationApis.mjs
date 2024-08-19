import express from 'express';
import { db } from '../index.mjs';

const router= express.Router();

router.post('/createAccount', (req, res) => {
    const { name, email, password } = req.body;
    const saveUserCredentials = `INSERT INTO table_name (name, email, password) VALUES (${name}, ${email}, ${password})`;
    db.query(saveUserCredentials,(err,result)=>{
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Failed to insert data' });
            return;
          }
          res.status(200).json({ message: 'Data inserted successfully', result});
    })
});

export default router;