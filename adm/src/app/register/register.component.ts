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
      user: [null, Validators.required],
      password: [null, Validators.required],
      celular: [null, Validators.required]
    })
  }
  initMap() {
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
      document.getElementById('map'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
  }

}
