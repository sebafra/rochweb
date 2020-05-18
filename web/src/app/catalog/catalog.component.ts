import { Component, OnInit, TemplateRef } from '@angular/core';
import { CarService } from '../services/car.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BrandService } from '../services/brand.service';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [CarService, ModelService]
})
export class CatalogComponent implements OnInit {
  cars: any = [];
  carsFiltered: any = [];
  objectKeys = Object.keys;

  textSearch: any = '';
  years: any = [];
  brands: any = [];
  models: any = [];
  new: Boolean;
  img_url_base: any = environment.imagesUrl;
  loader: any = './assets/img/loader.gif';
  offset: 100;
  modalRef: BsModalRef;
  filters: any = {};
  count: any = Object.keys(this.filters).length;
  private sub: any;
  searchResult: any = [];

  brandSelected: any ;
  modelSelected: any;
  yearSelected: any ;

  constructor(
    private modalService: BsModalService,
    private modelService: ModelService,
    public carService: CarService,
    public router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log('parametros', params);

      for (const prop in params) {
        if (params.hasOwnProperty(prop)) {
          this.filters[prop] = params[prop];
      }
    }
    console.log('filters ', this.filters);
    });
    this.loadCars();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadCars() {
    this.loader = true;
    this.carService.getAllSorted(this.filters, null, { timestamp: 1 }, ['brand', 'model'])
      .then(res => {
        this.carsFiltered = res;
        this.loader = false;
        console.log('this.carsFiltered: ', this.carsFiltered);
        return this.carService.getAllSorted({}, null, { timestamp: 1 }, ['brand', 'model']);
      })
      .then(res => {
        this.cars = res;
        console.log('All cars: ', this.cars);
        this.getBrands();
        this.getYears();
      });
  }

  showVehicle(item) {
    this.router.navigate(['/vehicle', item.id]);
  }

  deleteFilter(prop) {
    console.log('prop', prop);
    console.log('filtros', this.filters);
    delete this.filters[prop];
  }

  search(event) {
    const value = event.target.value.trim();
    this.filters = {};
    console.log('value: ', value);
    // this.loader = true;
    this.carService.search(value)
      .then(response => {
        const res: any = response;
        console.log({ response });
        this.carsFiltered = res.vehicles;
        this.loader = false;
      })
      .catch(error => {
        console.log({ error });
        alert(error.message);
        this.carsFiltered = [];
        this.loader = false;
      });
  }

  deleteFilters() {
    this.filters = {};
  }

  checkFilters() {
    this.count = Object.keys(this.filters).length;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submitFilters () {
    console.log('submit filters');

  }

  filterProperties () {
    return Object.keys(this.filters);
  }

getYears () {
  for (let i = 0; i < this.cars.length; i++) {
    if (this.years.filter(el => {
      return (el === this.cars[i].year);
    }).length <= 0) {
      this.years.push(this.cars[i].year);
    }
  }
  console.log('years: ', this.years);

}
 getBrands () {

   for (let i = 0; i < this.cars.length; i++) {
     if (this.brands.filter(el => {
       return (el._id === this.cars[i].brand._id);
      }).length <= 0) {
        this.brands.push(this.cars[i].brand);
      }
    }
    console.log('brands: ', this.brands);
  }

  changeModels(event) {
    const brand = event.target.value;
    console.log(brand);
    this.modelService.getAll({ brand })
      .then(res => {
        this.models = res;
        console.log(this.models);
      })
      .catch(err => console.log(err));
  }

  filterByModal() {
    this.filters = {};
    // if (this.new === undefined) {
    // }

    this.filters.new = this.new;
    this.filters.brand = this.brandSelected;
    this.filters.model = this.modelSelected;
    this.filters.year = this.yearSelected;
    for (const key in this.filters) {

      if (this.filters.hasOwnProperty(key) && !this.filters[key]) {
          delete this.filters[key];
      }
    }
    console.log('this.filters ', this.filters);
    this.carService.getAllSorted(this.filters, null, { timestamp: 1 }, ['brand', 'model'])
      .then(res => {
        this.carsFiltered = res;
        console.log('this.carsFiltered: ', this.carsFiltered);
      });
    this.modalRef.hide();
  }


   names(item) {
    console.log('item to add map', item);
    // tslint:disable-next-line:max-line-length
    const nombres: any = [
      ['new', this.filters.new === 'true' ? '0km' : 'Usados'],
      ['opportunity', 'Oportunidad'],
      ['newest', 'Novedad'],
      ['model', 'Modelo'],
      ['brand', 'Marca']];
     const miMapa = new Map(nombres);

     return miMapa.get(item);
    }
}
