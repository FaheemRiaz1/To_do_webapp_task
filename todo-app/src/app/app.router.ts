import { Routes } from '@angular/router';
import { ListDisplayComponent } from './components/todo-list/todo-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
//   { path: '', redirectTo: 'lists', pathMatch: 'full' },
//   { path: 'lists', component: ListDisplayComponent },
//   { path: 'lists/:id/tasks', component: TaskDetailComponent },
  {path:'dashboard', component:ListDisplayComponent}
];
