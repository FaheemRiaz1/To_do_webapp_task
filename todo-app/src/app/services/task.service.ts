// // src/app/services/task.service.ts
// import { Injectable } from '@angular/core';
// import { Task } from '../model/task.model';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { List } from '../model/lists.model';
// import { TaskStats } from '../model/stats.model';

// @Injectable({ providedIn: 'root' })
// export class TaskService {
//   private apiUrl = 'http://localhost:3000/tasks';
//   private apilistUrl = 'http://localhost:3000/lists'; // Adjust according to your actual API URL
  


// constructor(private http: HttpClient) {}

//   getTasks(): Observable<Task[]> {
//     return this.http.get<Task[]>(this.apiUrl);
//   }

//   addTask(task: Partial<Task>): Observable<Task> {
//     return this.http.post<Task>(this.apiUrl, task);
//   }

//   deleteTask(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }

//   updateTaskStatus(id: number, completed: boolean): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}/status`, { completed });
//   }
//   // getTasksByListId(listId: number): Observable<Task[]> {
//   //   return this.http.get<Task[]>(`${this.apilistUrl}/lists/${listId}/tasks`);
//   // }
//   getTasksByListId(listId: number): Observable<Task[]> {
//     return this.http.get<Task[]>(`${this.apiUrl}/${listId}/tasks`);
//   }
//   getLists(): Observable<List[]> {
//     return this.http.get<List[]>(this.apilistUrl);
//   }
//   // getTaskStats(listId: number): Observable<Task> {
//   //   return this.http.get<Task>(`${this.apiUrl}/stats/${listId}`);
//   // }
//   getTaskStats(listId: number): Observable<TaskStats> {
//     return this.http.get<TaskStats>(`${this.apilistUrl}/${listId}/stats`);
//   }
//   // addList(list:Partial(<List>)): Observable<List[]> {
//   //   return this.http.post<List[]>(this.apilistUrl,task);
//   // }
//   addList(list: Partial<List>): Observable<Task> {
//     return this.http.post<Task>(this.apilistUrl, list);
//   }

// }

// src/app/services/task.service.ts
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


  // ✅ Loads all lists from API and updates observable
  loadLists(): void {
    this.http.get<List[]>(this.apilistUrl).subscribe({
      next: (lists) => this.listsSubject.next(lists),
      error: (err) => console.error('Failed to load lists:', err)
    });
  }

  // Original fetch method
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
