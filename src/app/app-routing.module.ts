import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { HomePageComponent } from './main/home-page/home-page.component';
import { ProductModalComponent } from './products/product-modal/product-modal.component';
import { PlaceProfileComponent } from './places/place-profile/place-profile.component';
import { CategoryWithFiltersComponent } from './categories/category-with-filters/category-with-filters.component';
import { SearchComponent } from './main/search/search.component';
import { RegisterGuard } from './users/register/register.guard';
import { LoginGuard } from './users/login/login.guard';
import { PurchaseViewComponent } from './shop-cart/purchase-view/purchase-view.component';
import { DownloadAppComponent } from './main/landing/download-app/download-app.component';
import { SellInComponent } from './main/landing/sell-in/sell-in.component';
import { WhatIsComponent } from './main/landing/what-is/what-is.component';
import { TeamComponent } from './main/landing/team/team.component';
import { PressComponent } from './main/landing/press/press.component';
import { JobComponent } from './main/landing/job/job.component';

const routes: Routes = [
  //login
  { path: 'login', component: LoginComponent },

  //registrar usuario
  { path: 'register', component: RegisterComponent, canActivate: [RegisterGuard] },
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

  { path: 'compra/:indexPlace', component: PurchaseViewComponent, canActivate: [LoginGuard] },
  { path: 'descargar', component: DownloadAppComponent },
  { path: 'vende-en-plac', component: SellInComponent },
  { path: 'que-es-plac', component: WhatIsComponent },
  { path: 'equipo', component: TeamComponent },
  { path: 'prensa', component: PressComponent },
  { path: 'empleo', component: JobComponent },


  /*
  EJEMPLOS
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserFormComponent },
  */

  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
