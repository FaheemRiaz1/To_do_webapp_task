// src/app/components/task-form/task-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../services/task.service';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, FormsModule],
      providers: [
        {
          provide: TaskService,
          useValue: {} // mock TaskService if needed
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addTask with correct task data on form submit', () => {
    spyOn(component.addTask, 'emit');

    component.task.title = 'Test Title';
    component.task.description = 'Test Description';
    component.task.completed = false;

    // ✅ Mock form object with .valid = true
    const mockForm = {
        valid: true,
        resetForm: () => {} 
      } as NgForm;
      

    component.onSubmit(mockForm);

    expect(component.addTask.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Test Title',
        description: 'Test Description',
        completed: false
      })
    );
  });
});
