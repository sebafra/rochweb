import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../../app.constants';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.sass']
})
export class SidemenuComponent implements OnInit {
  subscriptionUpdateUserService: Subscription;
  isLoggedIn: boolean = false;
  userId: string = undefined;
  userName: string;

  constructor(

    private router: Router
  ) {
    this.loadUser();
    if (this.userId) {
    }

  }

  loadUser() {
    this.userId = localStorage.getItem('PENIEL_USUARIO_ID');
    this.userName = localStorage.getItem('PENIEL_USUARIO_NOMBRE');

    if (this.userId) {
      this.isLoggedIn = true;
    }

  }


  ngOnInit() {
    console.log('Login');
  }
  logout() {
    localStorage.removeItem('token');
    location.reload();
  }

}
