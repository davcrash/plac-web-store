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
import { SearchComponent } from './main/search/search.component';
import { PurchaseViewComponent } from './shop-cart/purchase-view/purchase-view.component';

const routes: Routes = [
  //login
  { path: 'login', component: LoginComponent },
  //home
  {
    path: '', component: HomePageComponent,
    children: [
      { path: 'product/:id', component: ProductModalComponent }
    ]
  },
  //perfil empresa
  {
    path: 'place/:id', component: PlaceProfileComponent,
    children: [
      { path: 'product/:id', component: ProductModalComponent }
    ]
  },
  //categoria
  {
    path: 'categoria/:category_name', component: CategoryWithFiltersComponent,
    children: [
      { path: 'product/:id', component: ProductModalComponent }
    ]
  },
  //busqueda
  {
    path: 'search', component: SearchComponent,
    children: [
      { path: 'product/:id', component: ProductModalComponent }
    ]
  },

  { path: 'compra/:indexPlace', component: PurchaseViewComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserFormComponent },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
