// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { List } from '../model/lists.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private apilistUrl = 'http://localhost:3000/lists'; // Adjust according to your actual API URL


constructor(private http: HttpClient) {}

getLists(): Observable<List[]> {
  return this.http.get<List[]>(this.apiUrl);
}
// getTasksByListId(listId: number): Observable<Task[]> {
//     return this.http.get<Task[]>(`${this.apilistUrl}/lists/${listId}/tasks`);
//   }
}
