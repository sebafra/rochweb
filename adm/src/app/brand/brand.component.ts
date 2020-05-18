import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BrandService } from '../services/brand.service';
import { BaseService } from '../services/base.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.sass'],
  providers: [BrandService]
})
export class BrandComponent extends BaseComponent {

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public brandService: BrandService
  ) {
    super(router, formBuilder, route, toastr, vcr, <BaseService>brandService);
  }

  getBasesURI() {
    return '/brands';
  }

  getFormNew() {
    return this.formBuilder.group({
      id: [null],
      name: [null, Validators.required]
    })
  }

  getFormEdit(item) {
    return this.formBuilder.group({
      id: [item._id],
      name: [item.name, Validators.required]
    })
  }

}
