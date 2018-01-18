import taskView from '../view/task';
import taskAddFromView from '../view/taskAddForm';
import tasks from '../model/task';

export default function taskController(rootElement) {

    taskView(rootElement, tasks, {
        onDone,
        onDelete,
        onMove
    });

    taskAddFromView(rootElement, {
        onSubmit
    });


    function onDone(task, status) {
        tasks.done(task, status);
    }

    function onDelete(task) {
        tasks.delete(task);
    }

    function onSubmit(text) {
        tasks.add(text);
    }

    function onMove(task) {
        tasks.move(task);
    }

}