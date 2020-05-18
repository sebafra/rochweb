import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from 'environments/environment';
import { Constants } from '../app.constants';
import { StoreService } from './store.service';
import { Router } from '@angular/router';

@Injectable()
export class BaseService {
  headers: any = {};
  constructor(
    public http: Http,
    public authService: StoreService,
    public router: Router
  ) {
   this.headers = {
      headers: new Headers({
        'Authorization': this.authService.getToken()
      })
    }
    console.log(this.headers);

   }

  getApiEndPoint() {
    return '';
  }

  getAll(filters): Promise<any[]> {
    return this.getAllSorted(filters, { name: 1 }, [])
  }

  getAllAndPopulate(filters, populates): Promise<any[]> {
    return this.getAllSorted(filters, { name: 1 }, populates)
  }

  getAllSorted(filters, pSort, populates): Promise<any[]> {

    let sort = {};
    if (pSort) {
      sort = pSort
    }

    const URL = environment.serverUrl + this.getApiEndPoint()
            + '/?_filters=' + encodeURI(JSON.stringify(filters))
            + '&sort=' + encodeURI(JSON.stringify(sort))
            + '&_populates=' + encodeURI(JSON.stringify(populates));

    console.log(URL);
    return this.http.get(URL, this.headers)
    .toPromise()
    .then(response =>
      response.json() as any[]
    )
    .catch(err => this.handleError(err));
  }

  create(occurrence): Promise<any> {

    const url = environment.serverUrl + this.getApiEndPoint();

    return this.http.post(url, occurrence, this.headers)
      .toPromise()
      .then(response =>
          response.json()
      )
      .catch(this.handleError.bind(this));
  }

  update(model): Promise<any> {

    const url = environment.serverUrl + this.getApiEndPoint() + '/' + model.id;

    return this.http.put(url, model, this.headers)
      .toPromise()
      .then(response =>
          response.json()
      )
      .catch(this.handleError.bind(this));
  }

  remove(model): Promise<any> {

    const url = environment.serverUrl + this.getApiEndPoint() + '/' + model.id;

    return this.http.delete(url, this.headers)
      .toPromise()
      .then(response =>
        response
      )
      .catch(this.handleError.bind(this));
  }

  deleteFiles(arr): Promise<any> {
    const url = environment.serverUrl + this.getApiEndPoint() + '/deleteFiles';
    const headers: any = {}
    const options = new RequestOptions({
      headers: headers,
      body: arr
    })
    return this.http.delete(url, options)
      .toPromise()
      .then( response => response)
      .catch(this.handleError.bind(this));
  }

  getById(id): Promise<any> {
    const URL = environment.serverUrl + this.getApiEndPoint() + '/' + id;
    return this.http.get(URL)
    .toPromise()
    .then(response =>
      response.json()
    )
    .catch(this.handleError);
  }



  handleError(error: any): Promise<any> {
    const self = this;
    if (error.status === 401) {
      localStorage.clear();
      self.router.navigateByUrl('/login')
      return Promise.resolve();

    } else {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);

    }
  }

}
