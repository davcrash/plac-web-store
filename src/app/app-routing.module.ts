import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { LoginComponent } from './users/login/login.component';
import { HomePageComponent } from './main/home-page/home-page.component';
import { PlaceWithProductsComponent } from './places/place-with-products/place-with-products.component';
import { ProductModalComponent } from './products/product-modal/product-modal.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      { path: 'product/:id', component: ProductModalComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserFormComponent },
  {
    path: 'categoria/:category_name', component: PlaceWithProductsComponent,
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
