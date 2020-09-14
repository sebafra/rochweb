import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { ArticleService } from '../services/article.service';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { environment } from 'environments/environment';
import { CategoryService } from '../services/category.service';
import { Constants } from 'app/app.constants';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass'],
  providers: [ArticleService, CategoryService]
})
export class ArticlesComponent extends BasesComponent {
imagesUrl: String
category = [];
categorySelected: any =  'null';
typeSelected: any;
user: any;
  constructor(
    public router: Router,
    public articleService: ArticleService,
    public categoryService: CategoryService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    super(router, <BaseService>articleService, toastr, vcr)
    this.imagesUrl = environment.imagesUrl
    this.user = Constants.LOGGED_USER;
  }

  ngOnInit(){
    if(this.user.role == 1){
      this.filters.user = this.user.id;
    }
    super.ngOnInit();
  }
  getBaseURI() {
    return '/article';
  }

  getPopulates() {
    return ['category', 'model']
  }

  getFilters() {
    return this.filters;
  }


  getItemSuccess() {
    // if (this.category.length > 0) {
    //   return
    // }
    // console.log('items: ', this.items)
    // for (let i = 0; i < this.items.length; i++) {
    //     console.log('category: ', this.category);
    //     if (this.category.filter(el => {
    //       return(el._id === this.items[i].category._id);
    //       }).length <= 0) {
    //     this.category.push(this.items[i].category)
    //     }
    // }
  }

  changeCategory(category) {
      this.categorySelected = category.target.value
      this.ArticlesFiltered()
  }

    // filtros de Type nuevo o 0km

  changeType(type) {
      this.typeSelected = type.target.value
      this.ArticlesFiltered()
   }

   updateStatus(item) {
     if (item.enabled) {
      item.enabled = false;
     } else {
      item.enabled = true;
     }
     this.baseService.update(item).then(res => {
       console.log("Updated Status", res);
       this.getItems();
     })
   }


    // filtra por parametros pasados es reutilizable
  ArticlesFiltered() {
    console.log('category: ', this.category)
    console.log('categorySelected: ', this.categorySelected)
    console.log('typeSelected: ', this.typeSelected)

    const params: any = {};

    if (this.typeSelected) {
      params.new = this.typeSelected;
    }
    if (this.categorySelected !== 'null') {
     params.category = this.categorySelected;
    }
    this.filters = params;
    this.getItems();
  }

}
