import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model'; // Import your Task model
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  imports: [CommonModule],  // Make sure CommonModule is listed here
  standalone: true
})
export class TaskDetailComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    if (listId) {
      this.taskService.getTasksByListId(+listId).subscribe({
        next: (tasks: Task[]) => { // Proper typing for tasks
          this.tasks = tasks;
        },
        error: (error: any) => { // Type for error
          console.error('Error fetching tasks:', error);
        }
      });
    }
  }
}
