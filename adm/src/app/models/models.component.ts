import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { ModelService } from '../services/model.service';
import { BrandService } from '../services/brand.service';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.sass'],
  providers: [BrandService, ModelService]
})
export class ModelsComponent extends BasesComponent {

  brands=[];

  constructor(
    public router: Router,
    public brandService: BrandService,
    public modelService: ModelService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    super(router, <BaseService>modelService, toastr, vcr)
  }

  getBaseURI() {
    return '/model';
  }

  getPopulates() {
    return ['brand']
  }

  getItemSuccess() {
    if (this.brands.length <= 0) {
      this.getBrands();

    }
  }

  getBrands() {

    for (let i = 0; i < this.items.length; i++) {
      if (this.brands.filter(el => {
        return (el._id === this.items[i].brand._id);
      }).length <= 0) {
        this.brands.push(this.items[i].brand);
      }
    }
    console.log('brands: ', this.brands);
  }

  // loadBrands() {
  //   this.brandService.getAll({}).then(items => {
  //     this.brands = items;
  //   });
  // }

  changeBrand(brand) {
    console.log(brand.target.value);
    if (brand.target.value === -1) {
      this.getItems({})
    } else {
      this.getItems({ brand: brand.target.value })
    }
  }

}
