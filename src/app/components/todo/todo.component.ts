import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  constructor(private todoService: TodoService) { }


  @Input()
  todo;
  @Output() newItemEvent = new EventEmitter<string>();



  makeit() {
    this.todo.item.completed = !this.todo.item.completed;
    this.todoService.updateItem(this.todo.id)
  }

  removetodo(id) {
    this.newItemEvent.emit(id);
  }
}
