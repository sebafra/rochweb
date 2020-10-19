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

  subcategories: any = [];
  categories: any = [];
  categorySelected: any;

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

  getSort() {
    return {'name': 1}
  }
  
  ngOnInit() {
    this.loadCategories();
    super.ngOnInit();
  }

  loadCategories() {
    this.categoryService.getAll({}).then(items => {
      this.categories = items;
      console.log("Categorías: ",this.categories);
    });
  }
  changeCategory(){
    if (this.categorySelected == "0") {
      this.filters = {};
    } else {
      this.filters = { category: this.categorySelected };
    }
    console.log("Category Selected: ",this.filters);
    this.getItems();
  }

}
