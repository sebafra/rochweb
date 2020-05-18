import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { BrandService } from '../services/brand.service';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass'],
  providers: [BrandService]
})
export class BrandsComponent extends BasesComponent {

  constructor(
    public router: Router,
    public brandService: BrandService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    super(router, <BaseService>brandService, toastr, vcr);
  }

  getBaseURI() {
    return '/brand';
  }
}
