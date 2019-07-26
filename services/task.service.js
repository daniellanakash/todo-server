getMembersQuery = 'SELECT `id`, `name` FROM `family_members`';
getTasksQuery = 'SELECT t.id, t.description, t.date, f.name\n' +
   'FROM tasks as t\n' +
   'join family_members as f\n' +
   'on t.member_id = f.id';
addTaskQuery = 'INSERT INTO `tasks` (`description`,`date`,`member_id`) VALUES (?,?,?)';
deleteTaskQuery = 'DELETE FROM `tasks` WHERE id=?';



const getMembers = () => {
   return new Promise(async (resolve, reject) => {
      try {
         const [results, fields] = await global.mysql.query(
            getMembersQuery);

         return resolve(results);
      }
      catch (err) {
         return reject(err)
      }
   })
};



const getTasks = () => {
   return new Promise(async (resolve, reject) => {
      try {
         const [results, fields] = await global.mysql.query(
            getTasksQuery);
         return resolve(results);
      }
      catch (err) {
         return reject(err)
      }
   })
};

const addTask = (data) => {
   console.log(data);
   return new Promise(async (resolve, reject) => {
      try {
         await global.mysql.query(
            addTaskQuery, [data[0], new Date().toISOString().split('T')[0], parseInt(data[1])]);
         return resolve()
      }
      catch (err) {
         return reject(err)
      }
   })
};


const deleteTask = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         await global.mysql.query(
            deleteTaskQuery, [[id]]);
         return resolve()
      }
      catch (err) {
         return reject(err)
      }
   })
};



module.exports = {
   getMembers,
   getTasks,
   addTask,
   deleteTask
};
