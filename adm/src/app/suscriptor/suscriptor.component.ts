import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SuscriptorService } from '../services/suscriptor.service';
import { BaseService } from '../services/base.service';
import { BaseComponent } from '../base/base.component';
import { FormValidator } from 'validators/form-validator';

@Component({
  selector: 'app-suscriptor',
  templateUrl: './suscriptor.component.html',
  styleUrls: ['./suscriptor.component.sass'],
  providers: [SuscriptorService]
})
export class SuscriptorComponent extends BaseComponent {

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public suscriptorService: SuscriptorService
  ) {
    super(router, formBuilder, route, toastr, vcr, <BaseService>suscriptorService);
  }

  getBasesURI() {
    return '/suscriptors';
  }

  getFormNew() {
    return this.formBuilder.group({
      id: [null],
      email: [null, Validators.compose([Validators.required, FormValidator.isValidMailFormat])]
    })
  }

  getFormEdit(item) {
    return this.formBuilder.group({
      id: [item._id],
      email: [item.email, Validators.compose([Validators.required, FormValidator.isValidMailFormat])]
    })
  }

}
