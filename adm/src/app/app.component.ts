import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StoreService } from './services/store.service';
import { Router } from '../../node_modules/@angular/router';
import { ToastsManager } from '../../node_modules/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Montrer';
  innerHeight: number;
  public viewContainerRef: ViewContainerRef;


  constructor(
    private authService: StoreService,
    private router: Router,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef

  ) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    if (!this.authService.checkAuth()) {
      this.router.navigate(['login'])
    }
  }

  logout() {
    this.authService.logout()
  }
}
