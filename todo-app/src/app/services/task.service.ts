// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { List } from '../model/lists.model';
import { TaskStats } from '../model/stats.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private apilistUrl = 'http://localhost:3000/lists'; // Adjust according to your actual API URL
  


constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTaskStatus(id: number, completed: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { completed });
  }
  // getTasksByListId(listId: number): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${this.apilistUrl}/lists/${listId}/tasks`);
  // }
  getTasksByListId(listId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${listId}/tasks`);
  }
  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.apilistUrl);
  }
  // getTaskStats(listId: number): Observable<Task> {
  //   return this.http.get<Task>(`${this.apiUrl}/stats/${listId}`);
  // }
  getTaskStats(listId: number): Observable<TaskStats> {
    return this.http.get<TaskStats>(`${this.apilistUrl}/${listId}/stats`);
  }
  // addList(list:Partial(<List>)): Observable<List[]> {
  //   return this.http.post<List[]>(this.apilistUrl,task);
  // }
  addList(list: Partial<List>): Observable<Task> {
    return this.http.post<Task>(this.apilistUrl, list);
  }

}
