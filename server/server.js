const express = require('express');
const { Sequelize, DataTypes } = require('sequelize'); 

const app = express();
const PORT = 3000;

// DB infornation
const sequelize = new Sequelize('mydata', 'abdo', 'testpass', {
    host: 'localhost',
    dialect: 'mysql'
});

//test connection
async function testDbConnection() {
  try {
    await sequelize.authenticate();
    console.log(' Connection has been established successfully.');
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
  }
}
testDbConnection();


// task model
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'new'
  }
});

// connect the model with the database
sequelize.sync()
  .then(() => console.log(' Tables synchronized'))
  .catch(err => console.error(' Error synchronizing tables:', err));


//  create Endpoints
app.get('/', (req, res) => {
    res.json({ message: "Server is running!" });
});

app.get('/create-task', async (req, res) => {
  const taskTitle = req.query.title;

  if (!taskTitle) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newTask = await Task.create({ title: taskTitle });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

//------------------------------------

app.post('/get-all-tasks', async (req, res) => {
  try {
    const allTasks = await Task.findAll();
    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
});
//------------------------------------

app.patch('/update-task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    await Task.update(
      { status: 'done' },
      { where: { id: taskId } }
    );

    res.json({ message: 'Update operation completed.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task.' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});