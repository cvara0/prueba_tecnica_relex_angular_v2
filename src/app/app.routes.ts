import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostListComponent } from './components/post-list/post-list.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'post-form',component:PostFormComponent},
    {path:'post-list',component:PostListComponent},
    {path:'**',pathMatch:'full',redirectTo:'home'}
];
