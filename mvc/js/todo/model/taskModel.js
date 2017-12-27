function TaskModel(tasks) {
    this.listeners = [];

    tasks = tasks || [];

    tasks.forEach(task => {
        this.push(task);
    });
}

TaskModel.prototype = Object.create(Array.prototype);

TaskModel.prototype.done = function (task, status) {
    task.done = status;
    this.trigger('done', [task]);

    let index = this.indexOf(task);
    if (index >= 0) {
        tasksArr.done = status;
        localStorage.setItem('tasksArr', JSON.stringify(tasksArr));
    }
};

TaskModel.prototype.add = function (text) {
    let task = {
        text,
        done: false,
        date: new Date
    };

    this.push(task);

    tasksArr.push(task);
    localStorage.setItem('tasksArr', JSON.stringify(tasksArr));

    this.trigger('add', [task]);
};


TaskModel.prototype.delete = function (task) {
    let index = this.indexOf(task);
    if (index >= 0) {
        this.splice(index, 1);

        tasksArr.splice(index, 1);
        localStorage.setItem('tasksArr', JSON.stringify(tasksArr));
    }

    this.trigger('delete', [task]);
};


TaskModel.prototype.move = function (task) {
    let index = this.indexOf(task);

    if (event.target.className === 'move-up') {
        if (index === 0) {
            return;
        } else {
            let taskAbove = this[index - 1];
            this[index - 1] = task;
            this[index] =	taskAbove;

            tasksArr[index - 1] = tasksArr[index];
            tasksArr[index] = taskAbove;
        }
    } else {
        if (index === this.length - 1) {
            return;
        } else {
            let	taskBelow = this[index + 1];
            this[index + 1] = task;
            this[index] = taskBelow;

            tasksArr[index + 1] = tasksArr[index];
            tasksArr[index] = taskBelow;
        }
    }

    localStorage.setItem('tasksArr', JSON.stringify(tasksArr));
    this.trigger('move', [task]);
};


TaskModel.prototype.on = function (event, callback) {
    this.listeners.push({
        event,
        callback
    });
};

TaskModel.prototype.trigger = function (event, args) {
    let tasks = this;

    this.listeners.forEach(listener => {
        if (listener.event === event) {
            listener.callback.apply(tasks, args);
        }
    });
};


