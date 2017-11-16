let list = JSON.parse(localStorage.getItem('list')) || [],
    input = document.querySelector('.input-wrap input'),
    saveBtn = document.querySelector('.input-wrap .save'),
    tbody = document.querySelector('.list tbody'),
    reverseBtn = document.querySelector('.input-wrap .reverse');

saveBtn.addEventListener('click', save, false);
reverseBtn.addEventListener('click', reverse, false);

function addRow(text, date, id) {
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
                let editBtn = document.createElement('button');
                editBtn.innerHTML = 'edit';
                editBtn.setAttribute('date-id', id);
                editBtn.addEventListener('click', editTask, false);
                td.appendChild(editBtn);
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
            addRow(list[j].text, list[j].date, j);
        }
    }

    return true;
}

function save() {
    if (input.value) {
        let toDo = {
            text: input.value,
            date: new Date
        };
        list.push(toDo);
        localStorage.setItem('list', JSON.stringify(list));

        addRow(toDo.text, toDo.date, list.length - 1);
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

if (list.length) {
    try {
        addRows();
    }
    catch (error) {
        console.log(error);
    }
} 