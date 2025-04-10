import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
// import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'lists/:list_id/tasks', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  // { path: 'about', component: AboutPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }  // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

