import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { BannerService } from '../services/banner.service';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.sass'],
  providers: [BannerService]
})
export class BannersComponent extends BasesComponent {
  imagesUrl: String = ''

  constructor(
    public router: Router,
    public bannerService: BannerService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    super(router, <BaseService>bannerService, toastr, vcr);
    this.imagesUrl = environment.imagesUrl;

  }

  getBaseURI() {
    return '/banner';
  }

  incrementOrder (event) {
    const i = event.order
    const itemOne = this.items[i - 1]
    const itemTwo = this.items[i]
    itemOne.order = itemTwo.order
    itemTwo.order = i
    this.items.splice(i - 1, 1, itemTwo)
    this.items.splice(i, 1, itemOne)

    this.items = this.items.map( item => this.bannerService.update(item).then(res => {
      console.log(res);
      this.getItems({});
    }
    ))
  }

  decrementOrder(event) {
    const i = event.order
    const itemOne = this.items[i - 1]
    const itemTwo = this.items[i - 2]
    itemOne.order = itemTwo.order
    itemTwo.order = i
    this.items.splice(i - 1, 1, itemTwo)
    this.items.splice(i, 1, itemOne)

    this.items = this.items.map( item => this.bannerService.update(item).then(res => {
      console.log(res);
      this.getItems({});
    }
    ))
  }

  getItems(filters) {
    this.baseService.getAllSorted(filters, {order: 1}, {}).then(items => {
      this.items = items
    });
  }
}
