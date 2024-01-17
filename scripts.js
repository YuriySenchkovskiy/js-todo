const list = JSON.parse(localStorage.getItem('list'));

//     [
//     {   id: 'id1',
//         title: 'Learn JS',
//         done: true
//     },
//     {   id: 'id2',
//         title: 'Learn React',
//         done: false
//     },
//     {   id: 'id3',
//         title: 'Get a job',
//         done: false
//     },
// ];

const listElement = document.getElementById('list');
const todoInput = document.getElementById('todoInput');

function render() {
    // чистим список
    listElement.innerHTML = null;

    list.forEach( el => {
        // создать элемент с тегом li
        const listItem = document.createElement('li');
        // добавляем класс для нашей кнопки done
        listItem.setAttribute('class', el.done ? 'done' : 'progress')
        const listItemText = document.createTextNode(el.title);
        listItem.appendChild(listItemText);

        // добавляем кнопку создавая ее
        const buttonItem = document.createElement('button');
        // добавляем каждой кнопке id из нашего массива
        buttonItem.setAttribute('id', el.id);
        const buttonItemText = document.createTextNode('Done');
        buttonItem.appendChild(buttonItemText);
        // добавляем кнопку к элементу li
        listItem.appendChild(buttonItem)

        // добавляем элемент в найденный по id элемент к списку
        listElement.appendChild(listItem);
    })
}

render();

// добавляем обработчик событий - по клике по ссылке мы будем выполнять какую то функцию
// функция тут стрелочная => то есть мы в нее аргументов не передаем
listElement.addEventListener('click', () => {
    // нужно понять, что было нажатие именно на нашу кнопку
    if(event.target.nodeName === 'BUTTON') {
        console.log(event.target.id);
        const id = event.target.id;
        for(let i = 0; i < list.length; i++) {
            if(list[i].id === id) {
                list[i].done = !list[i].done;
            }
        }

        updateLocalStorage();
        render();
    }
})

function addToList() {
    const todoInputValue = todoInput.value;
    list.push({
        id: Math.random().toString(),
        title: todoInputValue,
        done: false
    });

    updateLocalStorage();
    //рендерим его заного
    render();
    // очищаем инпут
    todoInput.value = '';
}

function updateLocalStorage() {
    //сохраним данные в local storage
    localStorage.setItem('list', JSON.stringify(list));
}