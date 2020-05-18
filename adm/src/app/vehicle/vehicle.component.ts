import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { BaseService } from '../services/base.service';
import { BrandService } from '../services/brand.service'
import { BaseComponent } from '../base/base.component';
import { ModelService } from '../services/model.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.sass'],
  providers: [VehicleService, BrandService, ModelService]
})
export class VehicleComponent extends BaseComponent {
  brands: any = [];
  models: any = [];
  images: any = [];
  fuels = ['diesel', 'nafta', 'gas'];
  imagesUrl: String = '';
  file: File;
  selectedType: any = '';
  imagesToRemove: any = [];
  brandSelected;
  loading = false;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public vehicleService: VehicleService,
    public brandService: BrandService,
    public modelService: ModelService
  ) {
    super(router, formBuilder, route, toastr, vcr, <BaseService>vehicleService)
    this.imagesUrl = environment.imagesUrl
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit () {
    super.ngOnInit()
    this.brandService.getAll({})
      .then(res => this.brands = res)
      .catch(err => console.log(err))
  }

  getBasesURI() {
    return '/vehicles';
  }

  getFormNew() {
    return this.formBuilder.group({
      id: [null],
      brand: [null, Validators.required] ,
      model: [null, Validators.required],
      year: [null, Validators.required],
      fuel: [null, Validators.required],
      description: [null],
      opportunity: [null],
      newest: [null],
      new: [null], // usado o 0km
      traction: [null],
      images: [null],
      color: [null],
      km: [null],
      patent: [null],

      // PRECIO
      price: [null],
      price_discount: [null],
      advance: [null],
      quot: [null],
      quot_price: [null],


      // Características estilo Autocity
      // CONFORT
      cold_air: [null],
      hot_air: [null],
      central_locking: [null],
      steeringWheel_commands: [null],
      front_liftsCrystals: [null],
      back_liftsCrystals: [null],
      navigation_system: [null],
      leather: [null], //tapizado de cuero
      cruise_control: [null],
      usb: [null],
      bluetooth: [null],
      electric_starter: [null],

      // SEGURIDAD

      airbag_pilot: [null],
      airbag_co_pilot: [null],
      airbag_lateral_sites: [null],
      direction: [null],
      abs_brakes: [null],

      // EXTERIOR
      headlights: [null], // faros
      tires: [null], // llantas
      parking_sensor: [null],
      polarized: [null]
    })
  }

  getFormEdit(item) {
    console.log('el vehiculo a editar:', item)
    this.images = item.images;
    this.modelService.getAll({ brand: item.brand })
      .then(res => {
        this.models = res
        console.log(this.models)
      })
      .catch(err => console.log(err))

    return this.formBuilder.group({
      id: [item._id],
      brand: [item.brand, Validators.required],
      model: [item.model, Validators.required],
      year: [item.year, Validators.required],
      fuel: [item.fuel, Validators.required],
      description: [item.description],
      opportunity: [item.opportunity],
      newest: [item.newest],
      new: [item.new], // usado o 0km
      traction: [item.traction],
      images: [item.images],
      color: [item.color],
      km: [item.km],
      patent: [item.patent],

      // PRECIO
      price: [item.price],
      price_discount: [item.price_discount],
      advance: [item.advance],
      quot: [item.quot],
      quot_price: [item.quot_price],

      // Características estilo Autocity
      // CONFORT
      cold_air: [item.cold_air],
      hot_air: [item.hot_air],
      central_locking: [item.central_locking],
      steeringWheel_commands: [item.steeringWheel_commands],
      front_liftsCrystals: [item.front_liftsCrystals],
      back_liftsCrystals: [item.back_liftsCrystals],
      navigation_system: [item.navigation_system],
      leather: [item.leather], // tapizado de cuero
      cruise_control: [item.cruise_control],
      usb: [item.usb],
      bluetooth: [item.bluetooth],
      electric_starter: [item.electric_starter],

      // SEGURIDAD

      airbag_pilot: [item.airbag_pilot],
      airbag_co_pilot: [item.airbag_co_pilot],
      airbag_lateral_sites: [item.airbag_lateral_sites],
      direction: [item.direction],
      abs_brakes: [item.abs_brakes],

      // EXTERIOR
      headlights: [item.headlights], // faros
      tires: [item.tires], // llantas
      parking_sensor: [item.parking_sensor],
      polarized: [item.polarized]
    })
  }

  onChange(event: EventTarget) {
      const eventObj: MSInputMethodContext = <MSInputMethodContext>event
      const target: HTMLInputElement = <HTMLInputElement>eventObj.target
      const files: FileList = target.files
      this.file = files[0]
      console.log('el Archivo es: ', this.file)
      this.loading = true;
      this.vehicleService.createImage(this.file).then(data => {
          console.log(JSON.stringify(data))
          this.images.push(data.image)
          console.log(this.images)
          this.loading = false;

      })
  }

  logForm(values) {
    values.images = this.images;
      console.log('new', values.new);

    if (values.new) {
      values.patent = '';
    }
    this.vehicleService.deleteFiles(this.imagesToRemove)
      .then(res =>
        console.log('response', res)
      )
      super.logForm(values)
  }

  deleteImage(event: EventTarget) {
    console.log(event);
    const index = this.images.findIndex(el => el === event);
    this.imagesToRemove.push(this.images.splice(index, 1)[0]);
  }

  changeModels(event) {
   const brand = event.target.value
    this.modelService.getAll({brand})
      .then(res => {
        this.models = res
        console.log(this.models)
      })
      .catch(err => console.log(err))
  }


}
