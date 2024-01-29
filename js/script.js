let todoInput;
let errorInfo;
let addBtn;
let ulList;

let popup, popupInfo, todoToEdit, popupInput, popupAddBtn, popupCloseBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvent();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector('.input');
	errorInfo = document.querySelector('.error');
	addBtn = document.querySelector('.todo_container__header--button');
	ulList = document.querySelector('.todoList');

	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupInput = document.querySelector('.popup-input');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};

const prepareDOMEvent = () => {
	addBtn.addEventListener('click', addNewTask);
	ulList.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', closePopup);
	popupAddBtn.addEventListener('click', changeTodoText);
};

const addNewTask = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li');
		let toDoParagraph = document.createElement('p');
		toDoParagraph.textContent = todoInput.value;
		newTodo.append(toDoParagraph);
		newTodo.classList.add('todoList_element');
		createToolsArea();

		ulList.appendChild(newTodo);

		todoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!';
	}
};

const createToolsArea = () => {
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');
	newTodo.append(toolsPanel);

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete', 'tools_button');
	completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit', 'tools_button');
	editBtn.textContent = 'EDIT';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete', 'tools_button');
	deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

	toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
	if (e.target.matches('.complete')) {
		e.target.parentElement.parentElement
			.querySelector('p')
			.classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editToDo(e);
	} else if (e.target.matches('.delete')) {
		deleteTodo(e);
	}
};

const editToDo = (e) => {
	todoToEdit = e.target.parentElement.parentElement.querySelector('p');
	popupInput.value = todoToEdit.textContent;
	popup.style.display = 'flex';
};

const closePopup = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.textContent = popupInput.value;
		popupInfo.textContent = '';
		closePopup();
	} else {
		popupInfo.textContent = 'Musisz podać treść zadania';
	}
};

const deleteTodo = (e) => {
	e.target.closest('li').remove();

	const allTodos = ulList.querySelectorAll('li');

	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście';
	}
};

document.addEventListener('DOMContentLoaded', main);
