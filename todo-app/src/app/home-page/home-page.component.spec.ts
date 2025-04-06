import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let service: TaskService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        HomePageComponent
      ],
      providers: [
        {
          provide: TaskService,
          useValue: {
            lists$: of([{ list_id: 1, title: "Test List", stats: { totalTasks: 5, completedTasks: 3 } }]),
            loadLists: jasmine.createSpy('loadLists'),
            addList: jasmine.createSpy('addList').and.returnValue(of({})),
            deleteList: jasmine.createSpy('deleteList').and.returnValue(of({})),
            getTaskStats: jasmine.createSpy('getTaskStats').and.returnValue(of({ totalTasks: 5, completedTasks: 3 }))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load lists on initialization', () => {
    expect(service.loadLists).toHaveBeenCalled();
  });

  it('should navigate to tasks on list select', () => {
    const spy = spyOn(router, 'navigate');
    component.onSelect({ list_id: 1, title: "Test List" });
    expect(spy).toHaveBeenCalledWith(['/lists', 1, 'tasks']);
  });

  it('should add a new list and clear the input', () => {
    component.newListTitle = "New List";
    component.onSubmit();
    expect(service.addList).toHaveBeenCalled();
    expect(component.newListTitle).toBe('');
  });

  // it('should delete a list', () => {
  //   component.onDelete(1);
  //   expect(service.deleteList).toHaveBeenCalledWith(1);
  // });
});
