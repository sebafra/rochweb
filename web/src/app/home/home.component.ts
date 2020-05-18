import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Constants } from '../app.constants';
import { BannerService } from '../services/banner.service';
import { CarService } from '../services/car.service';
import { Router } from '@angular/router';
import { VehicleComponent } from '../vehicle/vehicle.component';

declare var Pixlee: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [BannerService, CarService]
})
export class HomeComponent implements OnInit {
  cars: any = [];
  img_url_base: any = environment.imagesUrl;
  loader: any = './assets/img/loader.gif';
  offset: 100;
  banners: any = [];
  searchResult: any = [];

  constructor(
    // private noticiaService: NoticiaService,
    private bannerService: BannerService,
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCars();
    this.loadBanner();
    this.showWidget();
  }

  loadBanner() {
    this.bannerService.getAllSorted({}, null, { order: 1 }, []).then(
      result => {
        this.banners = result;
      }
    );
  }

  loadCars() {
    this.carService.getAllSorted({}, 9, { timestamp: 1 }, ['brand', 'model']).then(
      result => {
        this.cars = result;
      }
    );
  }

  showVehicle(item) {
    this.router.navigate(['/vehicle', item.id]);
  }

  showWidget() {
    Pixlee.init({ apiKey: 'kymLYwFkZ3GvZacx2vkJ' });
    Pixlee.addSimpleWidget({ widgetId: '8996' });
  }

  toCatalog(item) {
    const brand = item.brand._id;
    const model = item.model._id;
    const vehicle = { brand, model };
    console.log('vehicle ', vehicle);
    this.router.navigate(['catalog/', vehicle]);

  }


  search(event) {
    const value = event.target.value.trim();
    if (value === '') {
      this.searchResult = [];
      return;
    }
    console.log('value: ', value);
    this.carService.search(value)
      .then(response => {
        const res: any = response;
        console.log({response});
        this.searchResult = res.vehicles;
      })
      .catch(error => {
        console.log({error});
        alert(error.message);
        this.searchResult = [];
      });
  }

}
