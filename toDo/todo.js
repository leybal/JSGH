let list = JSON.parse(localStorage.getItem('list')) || [],
    input = document.querySelector('.input-wrap input'),
    saveBtn = document.querySelector('.input-wrap .save'),
    tbody = document.querySelector('.list tbody'),
    reverseBtn = document.querySelector('.input-wrap .reverse');

saveBtn.addEventListener('click', save, false);
reverseBtn.addEventListener('click', reverse, false);

function addRow(text, date, id, done) {
    let tr = document.createElement('tr'),
        options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

    if (done) tr.classList += 'done';
    for (let i = 0; i < 4; i++) {
        let td = document.createElement('td');
        switch (i) {
            case 0:
                td.innerHTML = text;
                break;
            case 1:
                td.innerHTML = new Date(date).toLocaleString("ru", options);
                break;
            case 2:
                let editBtn = document.createElement('button'),
                    doneBtn = document.createElement('button');

                editBtn.innerHTML = 'edit';
                editBtn.setAttribute('date-id', id);
                editBtn.addEventListener('click', editTask, false);
                td.appendChild(editBtn);

                doneBtn.innerHTML = 'done';
                doneBtn.setAttribute('date-id', id);
                doneBtn.addEventListener('click', doneTask, false);
                td.appendChild(doneBtn);
                break;
            case 3:
                let deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = 'delete';
                deleteBtn.setAttribute('date-id', id);
                deleteBtn.addEventListener('click', deleteTask, false);
                td.appendChild(deleteBtn);
                break;
        }
        tr.appendChild(td);
    }
    tbody.appendChild(tr);

    return true;
}

function addRows() {
    for (let j in list) {
        if (list[j]) {
            addRow(list[j].text, list[j].date, j, list[j].done);
        }
    }

    return true;
}

function save() {
    if (input.value) {
        let toDo = {
            text: input.value,
            date: new Date,
            done: false
        };
        list.push(toDo);
        localStorage.setItem('list', JSON.stringify(list));

        addRow(toDo.text, toDo.date, list.length - 1, list.done);
        input.value = '';
    } else {
        alert('Write a task please.');
    }

    return list;
}

function deleteTask(e) {
    let id = +e.target.getAttribute('date-id');
    list.splice(id, 1);
    localStorage.setItem('list', JSON.stringify(list));
    e.target.parentElement.parentElement.remove();

    return list;
}

function reverse() {
    try {
        if (list.length) {
            list.reverse();
            localStorage.setItem('list', JSON.stringify(list));
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            addRows();
        }
    }
    catch (error) {
        console.log(error);
    }
}

function saveChanges(e) {
    let id = e.target.getAttribute('date-id'),
        td = e.target.parentElement,
        text = td.querySelector('input').value;

    list[id].text = text;
    localStorage.setItem('list', JSON.stringify(list));
    td.innerHTML = text;

    return true;
}

function editTask(e) {
    let id = e.target.getAttribute('date-id'),
        editInput = document.createElement('input'),
        editBtn = document.createElement('button');

    editInput.type = 'text';
    editInput.value = list[id].text;
    editBtn.innerHTML = 'save';
    editBtn.setAttribute('date-id', id);
    editBtn.addEventListener('click', saveChanges, false);
    let firstTd = e.target.parentElement.parentElement.firstChild;
    firstTd.innerHTML = '';
    firstTd.appendChild(editInput);
    firstTd.appendChild(editBtn);

    return true;
}

function doneTask(e) {
    let id = e.target.getAttribute('date-id'),
        tr = e.target.parentElement.parentElement;
    list[id].done = !list[id].done;
    localStorage.setItem('list', JSON.stringify(list));
    tr.classList.toggle("done");

    return list;
}

function dragAndDrop() {
    let dragId = null;

    function handleDragStart(e) {
        this.classList.add('drag');
        dragId = this.lastChild.lastChild.getAttribute('date-id');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    function handleDrop(e) {
        let dropId = this.lastChild.lastChild.getAttribute('date-id');
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragId !== dropId) {
            let tmp = list[dropId];
            list[dropId] = list[dragId];
            list[dragId] = tmp;
            localStorage.setItem('list', JSON.stringify(list));
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            addRows();
            dragAndDrop();
        }

        return false;
    }

    let trs = document.querySelectorAll('table tr');

    [].forEach.call(trs, function(tr) {
        tr.addEventListener('dragstart', handleDragStart, false);
        tr.addEventListener('dragenter', function() {this.classList.add('over');}, false);
        tr.addEventListener('dragover', handleDragOver, false);
        tr.addEventListener('dragleave', function() {this.classList.remove('over');}, false);
        tr.addEventListener('drop', handleDrop, false);
    });
}

if (list.length) {
    try {
        addRows();
        dragAndDrop();
    }
    catch (error) {
        console.log(error);
    }
} 