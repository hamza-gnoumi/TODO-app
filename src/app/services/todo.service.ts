import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getItems() {
    return JSON.parse(localStorage.getItem('todos'));
  }
  getActiveItems() {
    return this.getItems().filter(item => item.item.completed === false);
  }
  getCompletedItems() {
    return this.getItems().filter(item => item.item.completed === true);
  }
  filter(word) {
    if (word === "All")
      return this.getItems();
    else if (word === "Active")
      return this.getActiveItems();
    else
      return this.getCompletedItems();
  }
  addItem(item) {
    let todos: any[] = [];;
    if (localStorage.getItem('todos')) {
      todos = this.getItems();
    }
    todos.push({ id: uuid(), item: item });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  updateItem(id) {
    let todos = this.getItems();
    todos.forEach(element => {
      if (element.id === id)
        element.item.completed = !element.item.completed
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  removeItem(id: string) {
    let todos = this.getItems();
    todos = todos.filter(item => !item.id.includes(id));
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  removeCompleted() {
    let todos = this.getItems();
    if (todos) {
      todos = todos.filter(item => item.item.completed === false);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}
