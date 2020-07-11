import { Component, OnInit } from '@angular/core';
import { Constants } from '../../app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.sass']
})
export class TopmenuComponent implements OnInit {
  // is_admin_login: boolean = Constants.IS_ADMIN_LOGIN;
  app_version: string = Constants.APP_VERSION;
  app_title: string = Constants.APP_NAME;
  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
  }

}
