import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { } from '@types/googlemaps';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  img_url_base: any;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  latitud = -31.43473;
  longitud = -64.1339017;
  banners: any = [
    {
      title: '',
      subtitle: '',
      image: 'assets/img/business/MONTRER_2.png'
    }, {
      title: '',
      subtitle: '',
      image: 'assets/img/business/MONTRER_1.png'
    }, {
      title: '',
      subtitle: '',
      image: 'assets/img/business/MONTRER_3.png'
    }
  ];

  constructor
    (
    ) {
  }

  ngOnInit() {
    this.loadMap();

  }

  loadMap() {
    const mapProp = {
      center: new google.maps.LatLng(this.latitud, this.longitud),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.latitud, this.longitud),
      title: 'Titulo de Business'
    });
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    marker.setMap(this.map);
  }



}
