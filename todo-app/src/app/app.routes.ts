import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TaskListComponent } from './task-list/task-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';   // Placeholder for 404

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'lists/:list_id/tasks',
    component: TaskListComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent // You can add a custom 404 component here
  }
];
