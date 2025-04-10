import { Injectable } from '@angular/core';
import { List } from '../model/lists.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class TaskService {
   private apiUrl = `${environment.apiBaseUrl}/tasks`;
   private apilistUrl = `${environment.apiBaseUrl}/lists`;

  private listsSubject = new BehaviorSubject<List[]>([]);
  public lists$ = this.listsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ✅ Loads all lists from API and updates observable
  loadLists(): void {
    this.http.get<List[]>(this.apilistUrl).subscribe({
      next: (lists) => this.listsSubject.next(lists),
      error: (err) => console.error('Failed to load lists:', err)
    });
  }

  // Optionally get the raw observable directly (without caching)
  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.apilistUrl);
  }
  
}
