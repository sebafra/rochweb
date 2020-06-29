import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { SubcategoryService } from '../services/subcategory.service';
import { CategoryService } from '../services/category.service';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.sass'],
  providers: [CategoryService, SubcategoryService]
})
export class SubcategoriesComponent extends BasesComponent {

  subcategories=[];

  constructor(
    public router: Router,
    public categoryService: CategoryService,
    public subcategoryService: SubcategoryService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    super(router, <BaseService>subcategoryService, toastr, vcr)
  }

  getBaseURI() {
    return '/subcategories';
  }

  getPopulates() {
    return ['category']
  }

  getItemSuccess() {
    if (this.subcategories.length <= 0) {
      this.getCategories();

    }
  }

  getCategories() {

    for (let i = 0; i < this.items.length; i++) {
      if (this.subcategories.filter(el => {
        return (el._id === this.items[i].category._id);
      }).length <= 0) {
        this.subcategories.push(this.items[i].category);
      }
    }
    console.log('subcategories: ', this.subcategories);
  }

  // loadBrands() {
  //   this.categoryService.getAll({}).then(items => {
  //     this.subcategories = items;
  //   });
  // }

  changeCategory(category) {
    console.log(category.target.value);
    if (category.target.value === -1) {
      this.getItems({})
    } else {
      this.getItems({ category: category.target.value })
    }
  }

}
