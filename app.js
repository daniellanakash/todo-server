const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const taskRouter = require('./controllers/task.controller.js');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', taskRouter);



const listen = () => new Promise((resolve, reject) => {
   app.listen(4004, err => {
      if (err) {
         return reject(err)
      }
      return resolve()
   });
});


const init = async () => {
   try {
      global.mysql = await mysql.createConnection({
         host: 'localhost',
         user: 'root',
         database: 'my_db',
         password: '1234'
      });
      await listen();
      console.log('Server Up');
   }
   catch (e) {
      console.log(e);
   }
};


init();

module.exports = app;