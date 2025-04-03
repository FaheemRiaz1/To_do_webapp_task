import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './services/task.service';
import { Task } from './model/task.model';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components//task-form/task-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskListComponent,TaskFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  title = '';
  description = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }
  addTask(task: Partial<Task>) {
    if (!task.title?.trim()) return;
  
    this.taskService.addTask(task).subscribe({
      next: () => {
        this.loadTasks();
      }
    });
  }
  

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  updateTaskStatus(data: { id: number; completed: boolean }) {
    this.taskService.updateTaskStatus(data.id, data.completed).subscribe(() => this.loadTasks());
  }
}
