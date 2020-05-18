import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModelService } from '../services/model.service';
import { BrandService } from '../services/brand.service'
import { BaseService } from '../services/base.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.sass'],
  providers: [ModelService, BrandService]
})
export class ModelComponent extends BaseComponent {
  brands: any = []

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public modelService: ModelService,
    public brandService: BrandService
  ) {
    super(router, formBuilder, route, toastr, vcr, <BaseService>modelService)

  }

  ngOnInit() {
    super.ngOnInit()
    this.brandService.getAll({})
      .then(res => {
        this.brands = res
      })
  }

  getBasesURI() {
    return '/models'
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
