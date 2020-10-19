import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { Constants } from '../app.constants';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { reject } from 'q';

@Component({
  selector: 'bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.sass']
})
export class BasesComponent implements OnInit {
  items = [];
  textSearch;
  loading = true;
  filters: any = {};

  getBaseURI() {
    return '';
  }

  constructor(
    public router: Router,
    public baseService: BaseService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
  }
  edit(item) {
    console.log("Edit item: ",item);
    this.router.navigate([this.getBaseURI() + '/' + item.id]);
  }
  remove(item) {
    if (!confirm('¿Esta seguro que desea eliminar este elemento?')) {
      return
    }
    this.baseService.remove(item)
      .then(data => {
        if (!data) {
          return reject({message: 'No autorizado'})
        }
        if (item.image) {
          return this.baseService.deleteFiles([item.image])
        } else {
          this.showSuccess(`se elimino correctamente `)
          this.getItems();
        }
      })
      .then(res => {
        if (res) {
          this.showSuccess(`se elimino correctamente `)
          this.getItems();
        }
      })
      .catch(err => {
      this.showError(err.message)
      this.getItems();
      })
  }

  create() {
    this.router.navigate([this.getBaseURI() + '/new']);
  }

  getFiltersSearch(textSearch) {
    const filters: any = {name: textSearch};
    return filters;
  }

  search() {
    const ts = this.textSearch.trim();
    //let filters: any = {};
    if ( ts !== '') {
      this.filters = this.getFiltersSearch(this.textSearch);
    }
    this.getItems();
  }


  ngOnInit() {
    this.getItems();
  }

  getFilters() {
    return this.filters;
  }

  getPopulates() {
    return [];
  }

  getSort() {
    return {};
  }

  getItems() {
    this.loading = true
    this.baseService.getAllSorted(this.getFilters(),this.getSort(), this.getPopulates()).then(items => {
      this.items = items;
      this.getItemSuccess();
      this.loading = false
    })
  }

  getItemSuccess() {
  }

  showSuccess(message) {
    this.toastr.success(message);
  }

  showError(message) {
    this.toastr.error(message);
  }

}
