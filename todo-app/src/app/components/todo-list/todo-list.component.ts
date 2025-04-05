// list-display.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/list.service'; // Adjust the import path as needed.
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class ListDisplayComponent implements OnInit {
  lists: any[] = []; // Adjust the type based on your actual data model.

  constructor(private listService: TaskService, private router: Router) {}

  ngOnInit(): void {
  console.log('Component loading -------------------------------------------------------------------------');

    this.listService.getLists().subscribe(lists => {
        console.log('Fetched lists:', lists);  // Check the structure and values here
        this.lists = lists;
      });
      
    this.listService.getLists().subscribe({
        
      next: (data) => this.lists = data,
      error: (err) => console.error('Failed to get lists', err)
    });
  }
  

  onSelect(list: any): void {
    console.log('Selected list ID:', list.id);
    this.router.navigate(['/lists', list.list_id, 'tasks']); // Ensure 'id' is the correct field name.
  }


}
