import Model from './src/model.js'
import View from './src/view.js'
import Controller from './src/controller.js'

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
