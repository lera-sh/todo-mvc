class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindAddTodo(this.addTodo.bind(this));
    this.view.bindEditTodo(this.editTodo.bind(this));
    this.view.bindDeleteTodo(this.deleteTodo.bind(this));
    this.view.bindToggleTodo(this.toggleTodo.bind(this));

    this.bindTodoListChanged(this.onTodoListChanged.bind(this));
    this.onTodoListChanged(this.model.todos);
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  commit(todos) {
    this.onTodoListChanged(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  onTodoListChanged(todos) {
    this.view.displayTodos(todos);
  }

  addTodo(todoText) {
    const todos = this.model.getTodos();

    const todo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false,
    };

    todos.push(todo);

    this.commit(todos);
  }

  editTodo(id, updatedText) {
    let todos = this.model.getTodos();

    todos = todos.map((todo) =>
      todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo
    );

    this.model.todos = todos;
    this.commit(todos);
  }

  deleteTodo(id) {
    let todos = this.model.getTodos();
  
    todos = todos.filter((todo) => todo.id !== id);

    this.model.todos = todos;
    this.commit(todos);
  }

  toggleTodo(id) {
    let todos = this.model.getTodos();

    todos = todos.map((todo) =>
      todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo
    );

    this.model.todos = todos;
    this.commit(todos);
  }
}

export default Controller;