// import { Component, input } from '@angular/core';

// @Component({
//   selector: 'app-task-list',
//   imports: [],
//   templateUrl: './task-list.component.html',
//   styleUrl: './task-list.component.css'
// })
// export class TaskListComponent {
//   list_id = input.required<number>();
// }

// src/app/components/task-list/task-list.component.ts
import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { Task } from '../model/task.model';
import { CommonModule } from '@angular/common';
// import { TaskService } from '../services/list.service';
import {TaskService} from '../services/task.service'
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm,FormsModule } from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';



@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  animations: [
    trigger('taskAnimations', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(20px)' }))
      ])
    ])
  ]

})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() toggleComplete = new EventEmitter<{ id: number, completed: boolean }>();
  task: Partial<Task> = {
    title: '',
    description: '',
    list_id: null
  };

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {}
  @Output() addTask = new EventEmitter<Partial<Task>>();

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

  list_id = input.required<number | null>();


    tasksList: any[] = []; // Adjust the type based on your actual data model.
  
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const rawId = params.get('list_id');
        this.task.list_id = rawId ? parseInt(rawId, 10) : null;
    
        if (this.task.list_id !== null) {
          this.taskService.getTasks().subscribe({
            next: (data) => {
              this.tasksList = data.filter(task => task.list_id === this.task.list_id);
              console.log("Filtered tasks:", this.tasksList);
              
            },
            error: (err) => console.error('Failed to get tasks', err)
          });
        }
      });
    }
    onDelete(id: number) {
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
    

    onToggle(task: Task) {
      const updatedStatus = !task.completed;
      this.taskService.updateTaskStatus(task.id!, updatedStatus).subscribe({
        next: (response) => {
          console.log("Task status updated:", response);
          // Optionally update local task object
          task.completed = updatedStatus;
        this.ngOnInit(); // Refresh the list

        },
        error: (err) => {
          console.error("Error updating status:", err);
        }
      });
    }
    selectedTaskToToggle: Task | null = null;
showConfirmModal = false;

confirmToggle(task: Task) {
  this.selectedTaskToToggle = task;
  this.showConfirmModal = true;
}

toggleConfirmed() {
  if (this.selectedTaskToToggle) {
    const updatedStatus = !this.selectedTaskToToggle.completed;
    this.taskService.updateTaskStatus(this.selectedTaskToToggle.id!, updatedStatus).subscribe({
      next: () => {
        this.selectedTaskToToggle!.completed = updatedStatus;
        this.selectedTaskToToggle = null;
        this.showConfirmModal = false;
        this.ngOnInit(); // Refresh the list

        // this.get(); // Optional: refresh after toggle
      },
      error: (err) => console.error("Error updating task status:", err)
    });
  }
}

cancelToggle() {
  this.selectedTaskToToggle = null;
  this.showConfirmModal = false;
}
sortedTasks(): Task[] {
  return [...this.tasksList].sort((a, b) => Number(a.completed) - Number(b.completed));
}


}
