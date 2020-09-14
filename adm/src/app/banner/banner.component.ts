import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BannerService } from '../services/banner.service';
import { BaseService } from '../services/base.service';
import { BaseComponent } from '../base/base.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass'],
  providers: [BannerService]
})
export class BannerComponent extends BaseComponent {
  image: String = ''
  imagesUrl: String = ''
  file: File



  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public bannerService: BannerService
  ) {
    super(router, formBuilder, route, toastr, vcr, <BaseService>bannerService);
    this.imagesUrl = environment.imagesUrl;

  }

  getBasesURI() {
    return '/banners';
  }

  getFormNew() {
    return this.formBuilder.group({
      image: [null, Validators.required],
      title: [null, Validators.required],
      subtitle: [null],
      link: [null],
      order: [null]
    })
  }

  getFormEdit(item) {
    console.log(item)
    const formObject = this.formBuilder.group({
      id: [item.id],
      image: [item.image, Validators.required],
      title: [item.title, Validators.required],
      subtitle: [item.subtitle],
      link: [item.link],
      order: [item.order]
    })
    this.image = formObject.controls['image'].value
    return formObject
  }

  onChange(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;
    this.file = files[0];
    console.log('el archivo es: ', this.file);
    this.bannerService.createImage(this.file).then(data => {
      console.log('data recibida del service createImage', JSON.stringify(data));
      this.image = data.file
    })
  }

  logForm(values) {
    values.image = this.image
    super.logForm(values)
  }
}
