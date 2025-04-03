// src/app/components/task-list/task-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() toggleComplete = new EventEmitter<{ id: number, completed: boolean }>();

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onToggle(task: Task) {
    this.toggleComplete.emit({ id: task.id!, completed: !task.completed });
  }
}
