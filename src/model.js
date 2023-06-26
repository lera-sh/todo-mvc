class Model {
    constructor() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || []
    }

    getTodos() {
      return this.todos
    }
  }

export default Model;