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

  loadTasks(): void {
    this.fetchTasks();
  }

  loadLists(): void {
    this.http.get<List[]>(this.apilistUrl).subscribe({
      next: (lists) => this.listsSubject.next(lists),
      error: (err) => console.error('Failed to load lists:', err)
    });
  }

  fetchTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (tasks) => this.tasksSubject.next(tasks),
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }

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

  getTasksByListId(listId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${listId}/tasks`);
  }

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.apilistUrl);
  }

  getTaskStats(listId: number): Observable<TaskStats> {
    return this.http.get<TaskStats>(`${this.apilistUrl}/${listId}/stats`);
  }

  addList(list: Partial<List>): Observable<Task> {
    return this.http.post<Task>(this.apilistUrl, list);
  }
}
