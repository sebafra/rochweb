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
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
//import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { BannersComponent } from './banners/banners.component';
import { BannerComponent } from './banner/banner.component';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoginComponent } from './login/login.component';
import { StoreService } from './services/store.service';
import { BaseComponent } from './base/base.component';
import { BasesComponent } from './bases/bases.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full'},
  { path: 'categories', component: CategoriesComponent, canActivate: [StoreService]  },
  { path: 'category/:id', component: CategoryComponent, canActivate: [StoreService] },
  { path: 'subcategories', component: SubcategoriesComponent, canActivate: [StoreService] },
  { path: 'subcategories/:id', component: SubcategoryComponent, canActivate: [StoreService] },
  { path: 'users', component: UsersComponent, canActivate: [StoreService] },
  //{ path: 'user/:id', component: UserComponent, canActivate: [StoreService] },
  { path: 'banners', component: BannersComponent, canActivate: [StoreService] },
  { path: 'banner/:id', component: BannerComponent, canActivate: [StoreService] },
  { path: 'articles', component: ArticlesComponent, canActivate: [StoreService] },
  { path: 'article/:id', component: ArticleComponent, canActivate: [StoreService] },
  { path: 'register/:id', component: RegisterComponent},
  { path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidemenuComponent,
    TopmenuComponent,
    CategoriesComponent,
    CategoryComponent,
    SubcategoriesComponent,
    SubcategoryComponent,
    //UserComponent,
    UsersComponent,
    BannersComponent,
    BannerComponent,
    ArticleComponent,
    ArticlesComponent,
    LoginComponent,
    BaseComponent,
    BasesComponent,
    RegisterComponent
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
