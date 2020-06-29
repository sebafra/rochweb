import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SubcategoryService } from '../services/subcategory.service';
import { CategoryService } from '../services/category.service'
import { BaseService } from '../services/base.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.sass'],
  providers: [SubcategoryService, CategoryService]
})
export class SubcategoryComponent extends BaseComponent {
  categories: any = []

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public subcategoryService: SubcategoryService,
    public brandService: CategoryService
  ) {
    super(router, formBuilder, route, toastr, vcr, <BaseService>subcategoryService)

  }

  ngOnInit() {
    super.ngOnInit()
    this.brandService.getAll({})
      .then(res => {
        this.categories = res
      })
  }

  getBasesURI() {
    return '/subcategories'
  }

  getFormNew() {
    return this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      brand: [null, Validators.required]
    })
  }

  getFormEdit(item) {
    return this.formBuilder.group({
      id: [item._id],
      name: [item.name, Validators.required],
      brand: [item.brand, Validators.required]
    })
  }

}
