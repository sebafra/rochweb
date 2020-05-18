import { Component, OnInit, TemplateRef } from '@angular/core';
import { CarService } from '../services/car.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  providers: [CarService]
})
export class VehicleComponent implements OnInit {
  cars: any = [];
  car: any = {};
  img_url_base: any = environment.imagesUrl;
  loading = false;
  loader: any = './assets/img/loader.gif';
  offset: 100;
  imageSelected: String;
  modalRef: BsModalRef;
  formObject: any = {};
  car_id: any = '';
  canSend = false;
  href: any;
  twitter: any;
  whatsapp: any;
  recaptcha_key = Constants.RECAPTCHA_SITE_KEY;

  constructor(
    private carService: CarService,
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private modalService: BsModalService

  ) {
   this.route.params.subscribe(params => {
      this.car_id = params.id;
    });
   }

  ngOnInit() {
      this.loadCars(this.car_id);
      const url = `http://www.montrer.com.ar/vehicle/${this.car_id}`;
      this.href = encodeURI(url);

      this.formObject = this.formBuilder.group({
        name: [null, Validators.required],
        lastname: [null, Validators.required],
        email: [null, Validators.required],
        description: [null, Validators.required],
      });
  console.log( this.formObject);
  }
  loadCars(_id) {
    // TODO: No debe estar el vehiculo que muestra esta vista en la lista
    this.carService.getAllSorted({_id}, 1, {}, ['brand', 'model'])
      .then(res => {
        this.car = res[0];
        console.log(this.car);
        this.imageSelected = this.car.images[0];
        return this.carService.getAllSorted({opportunity: true}, 3, { timestamp: 1 }, ['brand', 'model']);
      })
      .then(
        result => {
          this.cars = result;
          // tslint:disable-next-line:max-line-length
          this.twitter = encodeURI(`https://twitter.com/intent/tweet/?text=Te comparto ${this.car.brand.name} ${this.car.model.name} de ${this.href}`);
          // tslint:disable-next-line:max-line-length
          this.whatsapp = encodeURI(`https://api.whatsapp.com/send?text=Te comparto ${this.car.brand.name} ${this.car.model.name} de ${this.href}`);
          console.log(this.twitter);

        }
      )
      .catch(err => console.log(err));
  }

  changeImageSelected(image) {
    this.imageSelected = image;
  }

  showVehicle(item) {
    this.router.navigate(['/vehicle', item.id]);
  }


  sendConsult(values) {
    this.loading = true;
    values.id = this.car._id;
    values.vehicle = this.car;
    values.time = Date.now();
    console.log('Data to send:', values);

    this.carService.sendContact(values)
      .then(data => {
        if (data) {
          this.loading = false;
          this.modalRef.hide();
        } else {
          console.log('Error cargando registr');
        }
      })
      .catch(err => console.log(err));
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.canSend = true;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
