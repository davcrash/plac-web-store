import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

//Environment
import { environment } from '../environments/environment';
//Estilos
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//SideMenu
import { SidebarModule } from 'ng-sidebar';

//Banner slide
import { SlideshowModule } from 'ng-simple-slideshow';



//Componentes
import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { LoaderComponent } from './main/loader/loader.component';
import { SidemenuComponent } from './main/sidemenu/sidemenu.component';
import { LoginComponent } from './users/login/login.component';
import { NavComponent } from './main/nav/nav.component';
import { HomePageComponent } from './main/home-page/home-page.component';
import { BannerComponent } from './advertising/banner/banner.component';
import { SubcategoriesComponent } from './filters/subcategories/subcategories.component';
import { BrandsComponent } from './filters/brands/brands.component';
import { CarouselArrowsComponent } from './main/carousel-arrows/carousel-arrows.component';
import { PlaceCardComponent } from './places/place-card/place-card.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductModalComponent } from './products/product-modal/product-modal.component';
import { PlaceProfileComponent } from './places/place-profile/place-profile.component';
import { CategoryWithFiltersComponent } from './categories/category-with-filters/category-with-filters.component';
import { ShopCartViewComponent } from './shop-cart/shop-cart-view/shop-cart-view.component';
import { SearchComponent } from './main/search/search.component';
import { PurchaseViewComponent } from './shop-cart/purchase-view/purchase-view.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    PageNotFoundComponent,
    LoaderComponent,
    SidemenuComponent,
    LoginComponent,
    NavComponent,
    HomePageComponent,
    BannerComponent,
    SubcategoriesComponent,
    BrandsComponent,
    CarouselArrowsComponent,
    PlaceCardComponent,
    ProductCardComponent,
    ProductModalComponent,
    PlaceProfileComponent,
    CategoryWithFiltersComponent,
    ShopCartViewComponent,
    SearchComponent,
    PurchaseViewComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SidebarModule.forRoot(),
    SlideshowModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
