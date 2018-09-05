import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { LoginComponent } from './users/login/login.component';
import { HomePageComponent } from './main/home-page/home-page.component';
import { ProductModalComponent } from './products/product-modal/product-modal.component';
import { PlaceProfileComponent } from './places/place-profile/place-profile.component';
import { CategoryWithFiltersComponent } from './categories/category-with-filters/category-with-filters.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      { path: 'product/:id', component: ProductModalComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'place', component: PlaceProfileComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserFormComponent },
  {
    path: 'categoria/:category_name', component: CategoryWithFiltersComponent,
    children: [
      { path: 'product/:id', component: ProductModalComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
