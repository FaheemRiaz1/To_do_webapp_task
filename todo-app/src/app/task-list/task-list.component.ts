import { FormsModule, NgForm } from "@angular/forms";
import { Component } from '@angular/core';
import { Task } from "../model/task.model";
import { OnInit, input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "../services/task.service";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, FormsModule], 
  // any other options here like standalone, animations, etc.
})

export class TaskListComponent implements OnInit {
  task: Partial<Task> = { title: '', description: '', list_id: null };
  tasksList: Task[] = [];
  list_id = input.required<number | null>();

  selectedTaskToToggle: Task | null = null;
  showConfirmModal = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:any) => {
      const rawId = params.get('list_id');
      this.task.list_id = rawId ? parseInt(rawId, 10) : null;
      this.taskService.loadTasks();

      this.taskService.tasks$.subscribe((tasks:any) => {
        this.tasksList = tasks.filter((task:any) => task.list_id === this.task.list_id);
      });
    });
  }

  onSubmit(form: NgForm) {
    console.log("Form submitted", form.value);
    if (form.valid) {
      console.log("Form is valid");
      this.taskService.addTask(this.task).subscribe(
        (response: any) => {
          console.log("Task added successfully", response);
        this.ngOnInit(); // Refresh the list

        },
        (error: any) => {
          console.error("Failed to add task", error);
        }
      );
      this.task = { title: '', description: ''}; // Reset form but keep list_id
     form.resetForm(); // Reset the form and maintain list_id

    }
  }
  onDelete(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        console.log("Task deleted:", response);
      this.ngOnInit(); // Refresh the list

        // Optionally, reload task list or filter out the task locally
      },
      error: (err) => {
        console.error("Error deleting task:", err);
      }
    });
  }

  confirmToggle(task: Task): void {
    this.selectedTaskToToggle = task;
    this.showConfirmModal = true;
  }

  toggleConfirmed(): void {
    if (this.selectedTaskToToggle) {
      const updatedStatus = !this.selectedTaskToToggle.completed;
      this.taskService.updateTaskStatus(this.selectedTaskToToggle.id!, updatedStatus);
      this.selectedTaskToToggle = null;
      this.showConfirmModal = false;
    }
  }

  cancelToggle(): void {
    this.selectedTaskToToggle = null;
    this.showConfirmModal = false;
  }

  sortedTasks(): Task[] {
    return [...this.tasksList].sort((a, b) => Number(a.completed) - Number(b.completed));
  }
  onToggle(task: Task) {
    const updatedStatus = !task.completed;
    this.taskService.updateTaskStatus(task.id!, updatedStatus).subscribe({
      next: () => {
        this.taskService.fetchTasks(); // or loadTasks() based on BehaviorSubject
      },
      error: (err) => console.error("Error updating task status:", err)
    });
  }
}
