import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { List } from '../model/lists.model';
import { TaskStats } from '../model/stats.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private apilistUrl = 'http://localhost:3000/lists';
  private listsSubject = new BehaviorSubject<List[]>([]);
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();
  public lists$ = this.listsSubject.asObservable();

  constructor(private http: HttpClient) {}

  //  Unified method name to load tasks
  loadTasks(): void {
    this.fetchTasks();
  }


  //  Loads all lists from API and updates observable
  loadLists(): void {
    this.http.get<List[]>(this.apilistUrl).subscribe({
      next: (lists) => this.listsSubject.next(lists),
      error: (err) => console.error('Failed to load lists:', err)
    });
  }

  //  Loads all tasks from API and updates observable
  fetchTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (tasks) => this.tasksSubject.next(tasks),
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }
  //  Add Tasks
  addTask(task: Partial<Task>): Observable<Task> {
    return new Observable((observer) => {
      this.http.post<Task>(this.apiUrl, task).subscribe({
        next: (newTask) => {
          this.loadTasks();
          observer.next(newTask);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }
  //  Delete Tasks
  deleteTask(id: number): Observable<any> {
    return new Observable((observer) => {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: (res) => {
          this.loadTasks();
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }
  //  Update Tasks
  updateTaskStatus(id: number, completed: boolean): Observable<any> {
    return new Observable((observer) => {
      this.http.put(`${this.apiUrl}/${id}/status`, { completed }).subscribe({
        next: (res) => {
          this.loadTasks();
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  //  Add Tasks by list_id(foreign key)
  getTasksByListId(listId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${listId}/tasks`);
  }
  //  Add Lists
  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.apilistUrl);
  }
  //  Get Stats
  getTaskStats(listId: number): Observable<TaskStats> {
    return this.http.get<TaskStats>(`${this.apilistUrl}/${listId}/stats`);
  }
  //  Add Lists
  addList(list: Partial<List>): Observable<Task> {
    return this.http.post<Task>(this.apilistUrl, list);
  }
}
