import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Task } from '../model/task.model';

// Create a simple mock for NgForm
function createMockNgForm(): any {
  return {
    valid: true,
    value: {
      title: 'Test Task',
      description: 'Do something',
      list_id: 1
    },
    resetForm: jasmine.createSpy('resetForm')
  };
}
describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let service: TaskService;
  let route: ActivatedRoute;
  let mockForm: NgForm;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        TaskListComponent,  // Providing the standalone component directly
        {
          provide: TaskService,
          useValue: {
            tasks$: of([]),
            loadTasks: jasmine.createSpy('loadTasks'),
            addTask: jasmine.createSpy('addTask').and.returnValue(of({})),
            deleteTask: jasmine.createSpy('deleteTask').and.returnValue(of({})),
            updateTaskStatus: jasmine.createSpy('updateTaskStatus').and.returnValue(of({}))
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ list_id: '1' }))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TaskService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add further tests here as needed



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    expect(service.loadTasks).toHaveBeenCalled();
  });

  // it('should submit a valid form', () => {
  //   expect(service.addTask).toHaveBeenCalledWith(component.task);
  //   component.onSubmit(mockForm);
  //   expect(mockForm.resetForm).toHaveBeenCalled();
  // });

  it('should delete a task', () => {
    const taskId = 1;
    component.onDelete(taskId);
    expect(service.deleteTask).toHaveBeenCalledWith(taskId);
  });

  it('should toggle task completion', () => {
    const task = { id: 1, completed: false } as Task;
    component.onToggle(task);
    expect(service.updateTaskStatus).toHaveBeenCalledWith(1, true);
  });

  it('should correctly sort tasks by completion status', () => {
    component.tasksList = [
      { id: 2, completed: false } as Task,
      { id: 1, completed: true } as Task
    ];
    const sorted = component.sortedTasks();
    expect(sorted[0].id).toEqual(2);
    expect(sorted[1].id).toEqual(1);
  });
});