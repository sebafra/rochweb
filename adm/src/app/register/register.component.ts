import { BaseComponent } from 'app/base/base.component';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { BaseService } from '../services/base.service';

declare const google: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  providers: [UserService]
})
export class RegisterComponent extends BaseComponent {
  map: any;
  mapcenter: any = { lat: -31.4135, lng: -64.18105 };
  lat: any = this.mapcenter.lat;
  lng: any = this.mapcenter.lng;
  edit: boolean = false;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public userService: UserService,
  ) {
    super(router, formBuilder, route, toastr, vcr, <BaseService>userService)

  }
  ngOnInit(){
    this.initMap();
    super.ngOnInit();
  }
  getBasesURI() {
    return '/users';
  }

  getFormNew() {
    return this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      user: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      password: [null, Validators.compose([Validators.required,Validators.minLength(4)])],
      celular: [null, Validators.required],
      location: [null]

    })
  }
  getFormEdit(item) {
    console.log('usuario a editar:', item)
    this.lng = item.location.coordinates[0];
    this.lat = item.location.coordinates[1];
    this.map.setCenter({ lat: this.lat, lng: this.lng });
    this.edit = true;

    return this.formBuilder.group({
      id: [item.id],
      firstName: [item.firstName, Validators.required],
      lastName: [item.lastName, Validators.required],
      email: [item.email, Validators.required],
      user: [item.user, Validators.required],
      password: [item.password, Validators.required],
      celular: [item.celular, Validators.required],
      location: [item.location]
    })
  }
  initMap() {
    var self = this;
    this.map = new google.maps.Map(
      document.getElementById('map'), { 
        zoom: 9, 
      center: { lat: this.lat, lng: this.lng },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
        disableDoubleClickZoom: false,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
      });
    this.map.addListener('dragend', function () {
      let map_center = this.getCenter();
      let latLngObj = { 'lat': map_center.lat(), 'lng': map_center.lng() };
      console.log(latLngObj);
      self.lat = map_center.lat();
      self.lng = map_center.lng();
    });
  }

  onSubmit(values) {
    console.log('Values pre save', values);
    values.location = {
      coordinates: [this.lng, this.lat]
    };
    console.log('Values to save', values);
    super.logForm(values)
  }
  afterSuccessLogForm() {
    this.router.navigate(['/']);
  }

}
