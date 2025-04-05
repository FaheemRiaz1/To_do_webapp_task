import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TaskStats } from '../model/stats.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],  
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  lists: any[] = []; // Adjust the type based on your actual data model.
  stats:any[]=[];
  newListTitle: string = '';

  constructor(private listService: TaskService, private router: Router) {}

  ngOnInit(): void {
  console.log('Component loading -------------------------------------------------------------------------');

    this.listService.getLists().subscribe(lists => {
        console.log('Fetched lists:', lists);  // Check the structure and values here
        this.lists = lists;
      });
      
      this.listService.getLists().subscribe({
        next: (lists) => {
            this.lists = lists;
            lists.forEach(list => this.fetchTaskStatsForList(list.list_id as any));
        },
        error: (err) => console.error('Error fetching lists:', err)
    });
    
  this.listService.getLists().subscribe({
      
    next: (data) => this.lists = data,
    error: (err) => console.error('Failed to get lists', err)
  });
  }
  fetchTaskStatsForList(listId: number): void {
    console.log("Fetching stats for list ID:", listId);
    this.listService.getTaskStats(listId).subscribe({
      next: (stats: any) => {
        console.log(`Stats for list ${listId}:`, stats);
        const index = this.lists.findIndex(list => list.list_id === listId);

        if (index !== -1) {
          // Append stats directly to the list item
          this.lists[index].stats = stats;
        }
        console.log("Updated lists with stats:", this.lists);
      },
      error: (err) => console.error(`Failed to fetch stats for list ${listId}:`, err)
    });
}

  onSelect(list: any): void {
    console.log('Selected list ID:', list.id);
    this.router.navigate(['/lists', list.list_id, 'tasks']); // Ensure 'id' is the correct field name.
  }


  onSubmit() {
    if (!this.newListTitle.trim()) return;
  
    this.listService.addList({ title: this.newListTitle }).subscribe({
      next: (response) => {
        console.log('New list added:', response);
        this.newListTitle = '';
        this.ngOnInit(); // Refresh the list
      },
      error: (err) => {
        console.error('Failed to add new list:', err);
      }
    });
  }
}
