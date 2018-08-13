import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Environment
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Firebase
import { AngularFireModule } from 'angularfire2';

//Estilos
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//SideMenu
import { SidebarModule } from 'ng-sidebar';

//Banner slide
import {SlideshowModule} from 'ng-simple-slideshow';

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
import { PlaceWithProductsComponent } from './places/place-with-products/place-with-products.component';
import { CarouselArrowsComponent } from './main/carousel-arrows/carousel-arrows.component';
import { PlaceCardComponent } from './places/place-card/place-card.component';
import { ProductCardComponent } from './products/product-card/product-card.component';

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
    PlaceWithProductsComponent,
    CarouselArrowsComponent,
    PlaceCardComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SidebarModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    SlideshowModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
