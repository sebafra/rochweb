import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../../app.constants';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { StoreService } from 'app/services/store.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.sass']
})
export class SidemenuComponent implements OnInit {
  subscriptionUpdateUserService: Subscription;
  isLoggedIn: boolean = false;
  user: string = undefined;
  isAdmin: boolean;

  constructor(

    private router: Router,
    private storeService: StoreService
  ) {
    //this.isAdmin = this.storeService.isAdmin();
    //this.isLoggedIn = this.storeService.isLoggedIn();
    this.storeService.currentAdmin.subscribe(data => this.isAdmin = data);
    this.storeService.isLoggedIn.subscribe(data => this.isLoggedIn = data);
    console.log("------ isLoggedIn in Sidemenu ---------", this.isLoggedIn);
  }

  ngOnInit() {
    console.log('Login');
  }
  logout() {
    localStorage.removeItem('token');
    location.reload();
  }

}
