import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TaskStats } from '../model/stats.model';
import { List } from '../model/lists.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  lists: List[] = [];
  newListTitle: string = '';

  constructor(private listService: TaskService, private router: Router) {}

  ngOnInit(): void {
    // Load lists and their stats reactively
    this.listService.loadLists();
    this.listService.lists$.subscribe({
      next: (lists: any) => {
        this.lists = lists;
        this.lists.forEach(list => this.fetchTaskStatsForList(list.list_id!));
      },
      error: (err: any) => console.error('Error loading lists:', err)
    });
  }

  fetchTaskStatsForList(listId: number): void {
    this.listService.getTaskStats(listId).subscribe({
      next: (stats: TaskStats) => {
        const index = this.lists.findIndex(list => list.list_id === listId);
        if (index !== -1) {
          this.lists[index] = { ...this.lists[index], stats };
        }
      },
      error: (err) => console.error(`Failed to fetch stats for list ${listId}:`, err)
    });
  }

  onSelect(list: List): void {
    this.router.navigate(['/lists', list.list_id, 'tasks']);
  }

  onSubmit(): void {
    if (!this.newListTitle.trim()) return;
    this.listService.addList({ title: this.newListTitle }).subscribe({
      next: () => {
        this.newListTitle = '';
        this.listService.loadLists();
      },
      error: (err) => console.error('Failed to add list:', err)
    });
  }
  onDelete(id: number): void {
    this.listService.deleteTask(id).subscribe({
      next: (response) => {
        console.log("Task deleted:", response);
        this.ngOnInit(); // Refresh the list
      },
      error: (err) => {
        console.error("Error deleting task:", err);
      }
    });
  }
}
