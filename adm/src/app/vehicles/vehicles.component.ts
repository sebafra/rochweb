import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { VehicleService } from '../services/vehicle.service';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { environment } from 'environments/environment';
import { BrandService } from '../services/brand.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.sass'],
  providers: [VehicleService, BrandService]
})
export class VehiclesComponent extends BasesComponent {
imagesUrl: String
brands = [];
brandSelected: any =  'null';
typeSelected: any;
  constructor(
    public router: Router,
    public vehicleService: VehicleService,
    public brandService: BrandService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    super(router, <BaseService>vehicleService, toastr, vcr)
    this.imagesUrl = environment.imagesUrl
  }

  getBaseURI() {
    return '/vehicle';
  }

  getPopulates() {
    return ['brand', 'model']
  }



  getItemSuccess() {
    if (this.brands.length > 0) {
      return
    }
    console.log('items: ', this.items)
    for (let i = 0; i < this.items.length; i++) {
        console.log('brands: ', this.brands);
        if (this.brands.filter(el => {
          return(el._id === this.items[i].brand._id);
          }).length <= 0) {
        this.brands.push(this.items[i].brand)
        }
    }
  }

  changeBrand(brand) {
      this.brandSelected = brand.target.value
      this.VehiclesFiltered()
  }

    // filtros de Type nuevo o 0km

  changeType(type) {
      this.typeSelected = type.target.value
      this.VehiclesFiltered()
   }


    // filtra por parametros pasados es reutilizable
  VehiclesFiltered() {
    console.log('brands: ', this.brands)
    console.log('brandSelected: ', this.brandSelected)
    console.log('typeSelected: ', this.typeSelected)

    const params: any = {};

    if (this.typeSelected) {
      params.new = this.typeSelected;
    }
    if (this.brandSelected !== 'null') {
     params.brand = this.brandSelected;
    }
    this.getItems(params);
  }

}
