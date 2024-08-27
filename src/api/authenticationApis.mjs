import express from "express";
import { db } from "../index.mjs";
import { DB_Data } from "../helpers/constants.mjs";
import generateToken from "../jwtToken.mjs";

const router = express.Router();

router.post("/createAccount", async (req, res) => {
  console.log(req);
  const { userId, name, email, password } = req.body;
  const saveUserCredentials = `INSERT INTO ${DB_Data.Credentails_DB} (Id,Name, Email, Password) VALUES (?,?, ?, ?)`;
  db.query(saveUserCredentials, [userId, name, email, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to Create Account",err });
      return;
    }
      const gener = generateToken(result);
      res.status(200).json({
        message: "Login Successfull",
        auth: { ...gener, id: userId },
      });

  });
});

router.get("/getAllUserData", async (req, res) => {
  const getUserData = `SELECT * FROM ${DB_Data.Credentails_DB}`;
  db.query(getUserData, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to insert data" });
      return;
    }
    res.status(200).json(result);
  });
});

router.get("/getData/:id", async (req, res) => {
  const { id } = req.params;
  const getUserData = `SELECT * FROM ${DB_Data.Credentails_DB} WHERE Id=?`;

  db.query(getUserData, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve data" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({ data: { ...result[0] } });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const getUserData = `select * from ${DB_Data.Credentails_DB} where Email = ? and Password=?`;
  db.query(getUserData, [email, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: "you don't have access to this site" });
      return;
    }
    if (result.length > 0 && result[0].Access) {
      const gener = generateToken(result);
      res.status(200).json({
        message: "Login Successfull",
        auth: { ...gener, id: result[0].Id },
      });
    }
    res.status(403).json({ error: "you don't have access to this site" });
  });
});

router.patch("/updateProfile", async (req, res) => {
  const { name, designation, skill, photo, id, about } = req.body;
  console.log(req.body);
  const updateData = `UPDATE ${DB_Data.Credentails_DB} SET Name = ?, Designation = ?, Skills = ?,
    photo = ?, About = ? WHERE Id = ?`;
  const skills = JSON.stringify(skill);
  db.query(
    updateData,
    [name, designation, skills, photo, about, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to insert data", err });
        return;
      }
      res.status(200).json({ message: "Profile Updated Successfully" });
    }
  );
});

router.get("/getSkills", async (req, res) => {
  const getSkills = `SELECT * FROM ${DB_Data.Skills_DB}`;
  db.query(getSkills, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch data", err });
      return;
    }
    res.status(200).json({ data: result });
  });
});

router.get("/getDesignations", async (req, res) => {
  const getDesignations = `SELECT * FROM ${DB_Data.Designation_DB}`;
  db.query(getDesignations, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to insert data" });
      return;
    }
    res.status(200).json({ data: result });
  });
});

router.post("/addTask", async (req, res) => {
  const {
    taskName,
    taskDescription,
    taskStartDate,
    taskEndDate,
    taskExpectedHors,
    taskPriority,
    taskId,
    Id,
  } = req.body;
  const addTask = `INSERT INTO ${DB_Data.Tasks_DB} (TaskName, TaskDescription,
  TaskStartDate,taskEndDate, taskExpectedHors, TaskPriority, TaskId,Id) VALUES (?, ?, ?, ?, ?, ?,?,?
  )`;
  db.query(
    addTask,
    [
      taskName,
      taskDescription,
      taskStartDate,
      taskEndDate,
      taskExpectedHors,
      taskPriority,
      taskId,
      Id,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to insert data", err });
        return;
      }
      res.status(200).json({ message: "Task Added Successfully" });
    }
  );
});

router.get("/getTasksData", (req, res) => {
  const getTasksList = `SELECT * FROM ${DB_Data.Tasks_DB}`;

  db.query(getTasksList, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "we are unable to fetch the data", err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    return res.status(200).json({ ... result });
  });
});

router.get("/getTask/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const getTask = `SELECT * FROM ${DB_Data.Tasks_DB} WHERE TaskId = ?
  `;
  db.query(getTask, [taskId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "we are unable to fetch the data", err });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "No task found with the given id" });
    }
    res.status(200).json({ ...result });
  });
});

router.patch("/updateTask/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const {
    taskDescription,
    taskEndDate,
    taskSpentHours,
    taskExpectedHors,
    taskPriority,
    taskStatus
  } = req.body;
  const updateTask = `UPDATE ${DB_Data.Tasks_DB} SET taskExpectedHors = ?, TaskDescription
    = ?, taskSpentHours = ?, TaskEndDate = ?, taskStatus = ?, TaskPriority =
    ? WHERE TaskId = ?`;
  db.query(
    updateTask,
    [
      taskDescription,
      taskSpentHours,
      taskEndDate,
      taskExpectedHors,
      taskPriority,
      taskStatus,
      taskId
    ],
    (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ error: "we are unable to update the data", err });
        return;
      }
      res.status(200).json({ message: "Task Updated Successfully" });
    }
  );
});

router.get('/tasks', (req, res) => {
  const sortBy = req.query.sortBy || 'TaskName'; // Default sort by TaskName
  const sortOrder = req.query.sortOrder || 'asc';  // Default to ascending
  
  const query = `select * from ${DB_Data.Tasks_DB} order by ${sortBy} ${sortOrder}`
  console.log(req);
  db.query(query,(err,result)=>{
    if(err){
      res.status(500).json({error:"we are unable to fetch the data",err});
    }
    res.status(200).json({...result});
  })
});
export default router;
