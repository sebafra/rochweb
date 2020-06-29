import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { CategoryService } from '../services/category.service';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  providers: [CategoryService]
})
export class CategoriesComponent extends BasesComponent {

  constructor(
    public router: Router,
    public categoryService: CategoryService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    super(router, <BaseService>categoryService, toastr, vcr);
  }

  getBaseURI() {
    return '/category';
  }
}
