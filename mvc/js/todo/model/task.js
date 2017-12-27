let tasksArr = JSON.parse(localStorage.getItem('tasksArr')) || [];

let tasks = new TaskModel(tasksArr);
