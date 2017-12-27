function taskView(rootElement, tasks, actions) {
    let ul = document.createElement('ul');

    let template = document.createElement('li');
    template.innerHTML = `
        <input type="checkbox" class="done">
        <span class="text"></span>
        <span class="date"></span>
        <button class="delete">Delete</button>
        <button class="move-up">Up</button>
        <button class="move-down">Down</button>
    `;

    tasks.forEach(function(task) {
        add(task);
    });

    tasks.on('done', function (task) {
        [].forEach.call(ul.childNodes, function (li) {
            if (li.task === task) {
                li.querySelector('.text').style.textDecoration = task.done ? 'line-through' : '';
            }
        });
    });

    tasks.on('add', function (task) {
        add(task);
    });

    tasks.on('delete', function (task) {
        [].forEach.call(ul.childNodes, function (li) {
            if (li.task === task) {
                li.remove();
            }
        });
    });

    tasks.on('move', function () {
        let li = document.querySelectorAll('li');
        for (let i = 0; i < li.length; i++) {
            li[i].remove();
        }
        tasks.forEach(task => {
            add(task);
        });
    });

    rootElement.appendChild(ul);

    function add(task) {
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric'
        };

        let li = template.cloneNode(true);
        li.task = task;


        let text = li.querySelector('.text');
        text.innerHTML = task.text;
        text.style.textDecoration = task.done ? 'line-through' : '';

        let date = li.querySelector('.date');
        date.innerHTML = new Date(task.date).toLocaleString("ru", options);


        let checkbox = li.querySelector('.done');
        checkbox.checked = task.done ? 'checked' : '';
        checkbox.addEventListener('change', function (event) {
            actions.onDone(task, event.target.checked);
        });

        li.querySelector('.delete').addEventListener('click', function (event) {
            actions.onDelete(task);
        });

        li.querySelector('.move-up').addEventListener('click', function (event) {
            actions.onMove(task);
        });

        li.querySelector('.move-down').addEventListener('click', function (event) {
            actions.onMove(task);
        });

        ul.appendChild(li);
    }
}