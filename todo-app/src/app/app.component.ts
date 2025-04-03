import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './services/task.service';
import { Task } from './model/task.model';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskListComponent],
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

  addTask() {
    if (!this.title.trim()) return;
    const newTask: Partial<Task> = { title: this.title, description: this.description };
    this.taskService.addTask(newTask).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
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
