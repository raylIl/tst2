// 1. استدعاء المكتبات المطلوبة
const express = require('express');
const { Sequelize } = require('sequelize');

// 2. إنشاء تطبيق Express
const app = express();
const PORT = 3000; // المنفذ الذي سيعمل عليه السيرفر

// 3. تعريف معلومات الاتصال بقاعدة البيانات
const sequelize = new Sequelize('mydata', 'abdo', 'testpass', {
    host: 'mysql', // اسم الخدمة من docker-compose
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

// 5. إنشاء Endpoint أساسي للتجربة
app.get('/', (req, res) => {
    res.json({ message: "Server is running!" });
});

// 6. تشغيل السيرفر ليكون جاهزًا لاستقبال الطلبات
app.listen(PORT, () => {
    console.log(`🚀 Server is listening on http://localhost:${PORT}`);
});