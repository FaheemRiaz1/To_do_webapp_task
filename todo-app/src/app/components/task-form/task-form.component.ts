import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../../model/task.model';
import { NgForm,  FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Partial<Task> = {
    title: '',
    description: ''
  };

  @Output() addTask = new EventEmitter<Partial<Task>>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.addTask.emit(this.task); // emit task object to parent
      this.task = { title: '', description: '' }; // reset form
      form.resetForm();
    }
  }
}
