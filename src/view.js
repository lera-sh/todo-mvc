class View {
    constructor() {
        this.form = document.querySelector('.form');
        this.input = document.querySelector('.new-todo');
        this.todoList = document.querySelector('.todo-list');
      
        this._temporaryTodoText = '';
        this._initLocalListeners();
    }
  
    get _todoText() {
      return this.input.value
    }
  
    _resetInput() {
      this.input.value = ''
    }
  
    createElement(tag, className) {
      const element = document.createElement(tag)
      if (className) element.classList.add(className)
  
      return element
    }
  
    getElement(selector) {
      const element = document.querySelector(selector)
  
      return element
    }
  
    displayTodos(todos) {
      while (this.todoList.firstChild) {
        this.todoList.removeChild(this.todoList.firstChild)
      }
  
      if (todos.length === 0) {
        const p = this.createElement('p')
        p.textContent = 'Nothing to do! Add a task?'
        
        this.todoList.append(p)
      } else {
        todos.forEach(todo => {
          const li = this.createElement('li')
          li.id = todo.id
  
          const checkbox = this.createElement('input')
          checkbox.type = 'checkbox'
          checkbox.checked = todo.complete
  
          const span = this.createElement('span')
          span.contentEditable = true
          span.classList.add('editable')
  
          if (todo.complete) {
            const strike = this.createElement('s')
            strike.textContent = todo.text
            span.append(strike)
          } else {
            span.textContent = todo.text
          }
  
          const deleteButton = this.createElement('button', 'delete')
          deleteButton.textContent = 'Delete'
          li.append(checkbox, span, deleteButton)
  
          this.todoList.append(li)
        })
      }
    }
  
    _initLocalListeners() {
      this.todoList.addEventListener('input', event => {
        if (event.target.className === 'editable') {
          this._temporaryTodoText = event.target.innerText
        }
      })
    }
  
    bindAddTodo(handler) {
      this.form.addEventListener('submit', event => {
        event.preventDefault()
  
        if (this._todoText) {
          handler(this._todoText)
          this._resetInput()
        }
      })
    }
  
    bindDeleteTodo(handler) {
      this.todoList.addEventListener('click', event => {
        if (event.target.className === 'delete') {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id)
        }
      })
    }
  
    bindEditTodo(handler) {
      this.todoList.addEventListener('focusout', event => {
        if (this._temporaryTodoText) {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id, this._temporaryTodoText)
          this._temporaryTodoText = ''
        }
      })
    }
  
    bindToggleTodo(handler) {
      this.todoList.addEventListener('change', event => {
        if (event.target.type === 'checkbox') {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id)
        }
      })
    }
  }

export default View