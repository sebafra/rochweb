import { Component, OnInit } from '@angular/core';
import { Constants } from '../../app.constants';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from 'app/services/store.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.sass']
})
export class TopmenuComponent implements OnInit {
  // is_admin_login: boolean = Constants.IS_ADMIN_LOGIN;
  app_version: string = Constants.APP_VERSION;
  app_title: string = Constants.APP_NAME;
  user: any;
  constructor(
    private router: Router,
    private storeService: StoreService
  ) {
    this.storeService.userData.subscribe(data => this.user = data);
  }
  
  ngOnInit() {
  }
  showProfile(){
    this.router.navigate(['register' + '/' + this.user.id]);
  }
  logout(){
    this.storeService.logout()
  }

}
