import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { Task } from '../../model/task.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let sampleTasks: Task[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;

    sampleTasks = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
        created_at: new Date().toISOString(),
        list_id:1
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        completed: true,
        created_at: new Date().toISOString(),
        list_id:2

      }
    ];

    component.tasks = sampleTasks;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tasks', () => {
    const taskItems = fixture.debugElement.queryAll(By.css('li'));
    expect(taskItems.length).toBe(sampleTasks.length);
  });

  it('should emit delete event with correct id', () => {
    spyOn(component.delete, 'emit');

    const deleteButtons = fixture.debugElement.queryAll(By.css('button'));
    deleteButtons[0].nativeElement.click();

    expect(component.delete.emit).toHaveBeenCalledWith(sampleTasks[0].id as any);
  });

  it('should emit toggleComplete event with correct data', () => {
    spyOn(component.toggleComplete, 'emit');

    const checkboxes = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'));
    checkboxes[0].triggerEventHandler('change', { target: { checked: true } });

    expect(component.toggleComplete.emit).toHaveBeenCalledWith({
      id: sampleTasks[0].id as any,
      completed: true
    });
  });
});
