import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/tache';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'todo-app';
  isDark = false;
  ImgSource = '../assets/images/icon-moon.svg'
  typeFilter = 'All';
  todo: Tache = new Tache();
  listTodo: any[] = [];
  tache = '';
  constructor(private todoService: TodoService) { }
  ngOnInit(): void {
    if (localStorage.getItem('todos'))
      this.getItems();
    else {
      this.listTodo = [{ "id": "47eda485-86f0-470d-950d-af2f05ce0589", "item": { "desc": "Complete online JaveScript course", "completed": true } }, { "id": "fb20de09-1f62-416c-8e58-3e91f983fb7d", "item": { "desc": "Jog around the park 3x", "completed": false } }, { "id": "afa5f613-0334-4ea8-a1bf-fa530d6be404", "item": { "desc": "10 minutes meditaion", "completed": false } }, { "id": "1d51c29b-cec7-4ca5-a443-cccc206f3220", "item": { "desc": "Read for 1 hour", "completed": false } }, { "id": "d1eba166-45fa-4c76-ba07-330482136b59", "item": { "desc": "Pick up grocieries", "completed": false } }, { "id": "160ec201-c221-4582-965a-36a786d8352d", "item": { "desc": "Complete Todo App on Frontend Mentor", "completed": false } }]
      localStorage.setItem('todos', JSON.stringify(this.listTodo));
    }
  }
  getItems() {
    this.listTodo = this.todoService.getItems();
  }


  changeTheme() {
    if (!this.isDark) {
      if (!document.body.classList.contains('dark')) {
        document.body.classList.add('dark');
        this.isDark = true;
        this.ImgSource = '../assets/images/icon-sun.svg'
      }
    } else {
      if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        this.isDark = false;
        this.ImgSource = '../assets/images/icon-moon.svg'
      }
    }
  }

  filter(word) {
    this.typeFilter = word;
    this.listTodo = this.todoService.filter(word);
  }

  addTodo() {

    this.todo.desc = this.tache;
    this.todo.completed = false;
    this.todoService.addItem(this.todo);
    this.tache = "";
    this.filter('All');
    this.getItems();

  }
  removeItem(id: string) {
    this.todoService.removeItem(id);
    this.getItems();
  }
  removeCompleted() {
    this.todoService.removeCompleted();
    this.getItems();

  }
  nbreItemsLeft() {
    return this.todoService.getActiveItems().length;
  }
}
