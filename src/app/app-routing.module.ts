import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { LoginComponent } from './users/login/login.component';
import { HomePageComponent } from './main/home-page/home-page.component';
import { ViewCategoryComponent } from './main/view-category/view-category.component';



const routes: Routes = [
  { path: '',  component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserFormComponent },
  { path: 'categoria/:category_name', component: ViewCategoryComponent },
  { path: '**', component: PageNotFoundComponent },
  
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
