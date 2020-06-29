import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { environment } from 'environments/environment';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  providers: [UserService]
})
export class UsersComponent extends BasesComponent {
  urlApiCsv: any = environment.serverUrl + Constants.API_METHOD_USERS + '/csv'

  constructor(
    public router: Router,
    public userService: UserService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    super(router, <BaseService>userService, toastr, vcr);
  }

  getBaseURI() {
    return '/users';
  }
}
