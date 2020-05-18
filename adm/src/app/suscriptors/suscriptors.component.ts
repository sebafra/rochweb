import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { SuscriptorService } from '../services/suscriptor.service';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { environment } from 'environments/environment';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-suscriptors',
  templateUrl: './suscriptors.component.html',
  styleUrls: ['./suscriptors.component.sass'],
  providers: [SuscriptorService]
})
export class SuscriptorsComponent extends BasesComponent {
  urlApiCsv: any = environment.serverUrl + Constants.API_METHOD_SUSCRIPTORS + '/csv'

  constructor(
    public router: Router,
    public suscriptorServices: SuscriptorService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    super(router, <BaseService>suscriptorServices, toastr, vcr);
  }

  getBaseURI() {
    return '/suscriptor';
  }
}
