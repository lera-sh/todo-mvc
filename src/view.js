class View {
    constructor() {
        this.form = document.querySelector('.form');
        this.input = document.querySelector('.new-todo');
        this.todoList = document.querySelector('.todo-list');
      
        this.temporaryTodoText = '';
        this.initLocalListeners();
    }
  
    get todoText() {
      return this.input.value
    }
  
    resetInput() {
      this.input.value = ''
    }
  
    createElement(tag, className) {
      const element = document.createElement(tag)
      if (className) element.classList.add(className)
  
      return element
    }
  
    displayTodos(todos) {
      [...this.todoList.children].forEach(child => {
        this.todoList.removeChild(child)
      })
  
      if (todos.length === 0) {
        const p = this.createElement('p')
        p.textContent = 'Nothing to do! Add a task?'
        
        this.todoList.append(p)
      } else {
        todos.forEach(todo => {
          const li = this.createElement('li')
          const checkbox = this.createElement('input')
          const span = this.createElement('span')
          const deleteButton = this.createElement('button', 'delete')

          li.id = todo.id
          checkbox.checked = todo.complete
          span.contentEditable = true

          checkbox.type = 'checkbox'
          span.classList.add('editable')
          deleteButton.textContent = 'Delete'
  
          if (todo.complete) {
            const strike = this.createElement('s')
            strike.textContent = todo.text

            span.append(strike)
          } else {
            span.textContent = todo.text
          }

          li.append(checkbox, span, deleteButton)
          this.todoList.append(li)
        })
      }
    }
  
    initLocalListeners() {
      this.todoList.addEventListener('input', event => {
        if (event.target.className === 'editable') {
          this.temporaryTodoText = event.target.innerText
        }
      })
    }
  
    bindAddTodo(handler) {
      this.form.addEventListener('submit', event => {
        event.preventDefault()
  
        if (this.todoText) {
          handler(this.todoText)
          this.resetInput()
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
      this.todoList.addEventListener('keydown', event => {
        if (!event.target.isContentEditable) return 
        if (event.code === 'Enter') {
          event.target.blur()
        }
      }) 

      this.todoList.addEventListener('focusout', event => {
        if (!event.target.isContentEditable) return 
        if (event.target.innerText.trim()) {
          const id = parseInt(event.target.parentElement.id);
    
          handler(id, event.target.innerText);
        }
      });
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