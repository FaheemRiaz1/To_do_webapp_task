import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Task } from '../model/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: any;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', [
      'loadTasks',
      'addTask',
      'deleteTask',
      'updateTaskStatus',
      'fetchTasks'
    ]);
    mockTaskService.tasks$ = of([]);

    await TestBed.configureTestingModule({
      imports: [
        TaskListComponent,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1'
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a task', () => {
    mockTaskService.deleteTask.and.returnValue(of({ success: true }));
    spyOn(component, 'ngOnInit');  // spy on refresh logic

    component.onDelete(123);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(123);
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should update task status (onToggle)', () => {
    mockTaskService.updateTaskStatus.and.returnValue(of({}));
    const task: Task = {
      id: 5,
      title: 'Test task',
      description: 'testing',
      completed: false,
      list_id: 1,
      created_at: ''
    };

    component.onToggle(task);
    expect(mockTaskService.updateTaskStatus).toHaveBeenCalledWith(5, true);
  });

  it('should confirm toggle and update task', () => {
    const task: Task = {
      id: 2,
      title: 'Test',
      description: 'desc',
      completed: false,
      list_id: 1,
      created_at: ''
    };

    mockTaskService.updateTaskStatus.and.returnValue(of({}));

    component.confirmToggle(task);
    expect(component.showConfirmModal).toBe(true);
    expect(component.selectedTaskToToggle).toEqual(task);

    component.toggleConfirmed();
    expect(mockTaskService.updateTaskStatus).toHaveBeenCalledWith(2, true);
    expect(component.showConfirmModal).toBe(false);
    expect(component.selectedTaskToToggle).toBeNull();
  });

  it('should cancel toggle', () => {
    component.showConfirmModal = true;
    component.selectedTaskToToggle = {
      id: 1, title: '', description: '', completed: false, list_id: 1, created_at: ''
    };

    component.cancelToggle();
    expect(component.showConfirmModal).toBe(false);
    expect(component.selectedTaskToToggle).toBeNull();
  });

  it('should sort tasks with incomplete first', () => {
    component.tasksList = [
      { id: 1, title: 'Complete', description: '', completed: false, list_id: 1, created_at: '' },
      { id: 2, title: 'Incomplete', description: '', completed: true, list_id: 1, created_at: '' }
    ];

    const sorted = component.sortedTasks();
    expect(sorted[0].completed).toBe(false);
    expect(sorted[1].completed).toBe(true);
  });
});
