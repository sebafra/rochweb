import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaModule } from 'ng-recaptcha';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopmenuComponent } from './shared/topmenu/topmenu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CatalogComponent } from './catalog/catalog.component';
import { ArticleComponent } from './article/article.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ToastModule } from 'ng2-toastr';
import { BusinessComponent } from './business/business.component';
import { KeyvaluePipe } from './pipes/keyvalue.pipe';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'article/:id', component: ArticleComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopmenuComponent,
    FooterComponent,
    TruncatePipe,
    CatalogComponent,
    ArticleComponent,
    BusinessComponent,
    KeyvaluePipe
  ],
  imports: [
    BrowserModule, HttpModule, LazyLoadImageModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    CarouselModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    RecaptchaModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
