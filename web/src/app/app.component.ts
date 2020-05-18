import { Component, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastsManager } from '../../node_modules/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public viewContainerRef: ViewContainerRef;

  constructor(
    private router: Router,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
) {
    this.toastr.setRootViewContainerRef(vcr);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
