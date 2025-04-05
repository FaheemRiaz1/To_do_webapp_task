import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './services/task.service';
import { Task } from './model/task.model';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import {ListDisplayComponent} from './components/todo-list/todo-list.component'
import {TaskDetailComponent} from './components/task-detail/task-detail.component'
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskListComponent, TaskFormComponent, ListDisplayComponent, TaskDetailComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  title = "Welcome to To Do App";
  errorMessage = '';
  showForm: boolean = false;
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    console.log('AppComponent initialized ------------------------------');
    this.loadTasks();
    
  }
  toggleFormVisibility(): void {
    this.showForm = !this.showForm;  // Toggle the form's visibility
  }
  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Error loading tasks.';
      }
    });
  }

  addTask(task: Partial<Task>) {
    if (!task.title?.trim()) {
      this.errorMessage = 'Title is required.';
      return;
    }

    this.taskService.addTask(task).subscribe({
      next: () => {
        this.loadTasks();
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Error adding task.';
      }
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Error deleting task.';
      }
    });
  }

  updateTaskStatus(data: { id: number; completed: boolean }) {
    this.taskService.updateTaskStatus(data.id, data.completed).subscribe({
      next: () => {
        this.loadTasks();
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Error updating task.';
      }
    });
  }
 }
