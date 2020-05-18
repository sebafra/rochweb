import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Vendor
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ToastModule } from 'ng2-toastr';

// services
// import { UpdateHeaderService } from './services/update-header.service';

// pipes
import { ApplicationPipes } from './application.pipes';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import { TopmenuComponent } from './shared/topmenu/topmenu.component';
import { BrandsComponent } from './brands/brands.component';
import { BrandComponent } from './brand/brand.component';
import { ModelsComponent } from './models/models.component';
import { ModelComponent } from './model/model.component';
import { SuscriptorComponent } from './suscriptor/suscriptor.component';
import { SuscriptorsComponent } from './suscriptors/suscriptors.component';
import { BannersComponent } from './banners/banners.component';
import { BannerComponent } from './banner/banner.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { LoginComponent } from './login/login.component';
import { StoreService } from './services/store.service';
import { BaseComponent } from './base/base.component';
import { BasesComponent } from './bases/bases.component';

const routes: Routes = [
  { path: '', redirectTo: 'brands', pathMatch: 'full'},
  { path: 'brands', component: BrandsComponent, canActivate: [StoreService] },
  { path: 'brand/:id', component: BrandComponent, canActivate: [StoreService]  },
  { path: 'models', component: ModelsComponent, canActivate: [StoreService] },
  { path: 'model/:id', component: ModelComponent, canActivate: [StoreService] },
  { path: 'suscriptors', component: SuscriptorsComponent, canActivate: [StoreService] },
  { path: 'suscriptor/:id', component: SuscriptorComponent, canActivate: [StoreService] },
  { path: 'banners', component: BannersComponent, canActivate: [StoreService] },
  { path: 'banner/:id', component: BannerComponent, canActivate: [StoreService] },
  { path: 'vehicles', component: VehiclesComponent, canActivate: [StoreService] },
  { path: 'vehicle/:id', component: VehicleComponent, canActivate: [StoreService] },
  { path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidemenuComponent,
    TopmenuComponent,
    BrandsComponent,
    BrandComponent,
    ModelsComponent,
    ModelComponent,
    SuscriptorComponent,
    SuscriptorsComponent,
    BannersComponent,
    BannerComponent,
    VehicleComponent,
    VehiclesComponent,
    LoginComponent,
    BaseComponent,
    BasesComponent
  ],
  imports: [
    ApplicationPipes,
    BrowserModule,
    LazyLoadImageModule,
    AngularFontAwesomeModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
