import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { BaseService } from '../services/base.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass'],
  providers: [CategoryService]
})
export class CategoryComponent extends BaseComponent {

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public categoryService: CategoryService
  ) {
    super(router, formBuilder, route, toastr, vcr, <BaseService>categoryService);
  }

  getBasesURI() {
    return '/categories';
  }

  getFormNew() {
    return this.formBuilder.group({
      name: [null, Validators.required]
    })
  }

  getFormEdit(item) {
    return this.formBuilder.group({
      id: [item.id],
      name: [item.name, Validators.required]
    })
  }

}
