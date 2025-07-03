// 1. استدعاء المكتبات المطلوبة
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize'); // <-- تأكد من إضافة DataTypes

// 2. إنشاء تطبيق Express
const app = express();
const PORT = 3000;

// 3. تعريف معلومات الاتصال بقاعدة البيانات
const sequelize = new Sequelize('mydata', 'abdo', 'testpass', {
    host: 'localhost',
    dialect: 'mysql'
});

// 4. اختبار الاتصال بقاعدة البيانات
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connection to database has been established successfully.');
    })
    .catch(err => {
        console.error('❌ Unable to connect to the database:', err);
    });

// ===================================
//      ## أضف هذا القسم المفقود ##
// ===================================

// 5. تعريف موديل المهمة (Task Model)
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

// 6. مزامنة الموديل مع قاعدة البيانات لإنشاء الجدول
sequelize.sync()
  .then(() => console.log('✅ Tables synchronized'))
  .catch(err => console.error('❌ Error synchronizing tables:', err));

// ===================================
//    ## نهاية القسم المفقود ##
// ===================================

// 7. إنشاء Endpoints
app.get('/', (req, res) => {
    res.json({ message: "Server is running!" });
});

app.get('/create-task', async (req, res) => {
  const taskTitle = req.query.title;

  if (!taskTitle) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    // الآن، سيعرف Node.js ما هو Task
    const newTask = await Task.create({ title: taskTitle });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error); // طباعة الخطأ في السيرفر للمساعدة في التشخيص
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// 8. تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 Server is listening on http://localhost:${PORT}`);
});