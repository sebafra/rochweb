import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Constants } from '../app.constants';

@Injectable()
export class BaseService {

  constructor(
    public http: Http
  ) { }

  getApiEndPoint() {
    return '';
  }

  getAll(filters): Promise<any[]> {
    return this.getAllSorted(filters, null, { name: 1 }, []);
  }

  getAllAndPopulate(filters, populates): Promise<any[]> {
    return this.getAllSorted(filters, null, { name: 1 }, populates);
  }


  getAllSorted(filters, limit, pSort, populates): Promise<any[]> {

    let sort = {};
    if (pSort) {
      sort = pSort;
    }

    const URL = environment.serverUrl + this.getApiEndPoint()
      + '/?_filters=' + encodeURI(JSON.stringify(filters))
      + '&limit=' + limit
      + '&sort=' + encodeURI(JSON.stringify(sort))
      + '&_populates=' + encodeURI(JSON.stringify(populates));

    console.log(URL);
    return this.http.get(URL)
      .toPromise()
      .then(response =>
        response.json() as any[]
      )
      .catch(this.handleError);
  }

  create(occurrence): Promise<any> {

    let url = environment.serverUrl + this.getApiEndPoint();

    return this.http.post(url, occurrence)
      .toPromise()
      .then(response =>
        response.json()
      )
      .catch(this.handleError.bind(this));
  }

  update(model): Promise<any> {

    let url = environment.serverUrl + this.getApiEndPoint() + "/" + model.id;

    return this.http.put(url, model)
      .toPromise()
      .then(response =>
        response.json()
      )
      .catch(this.handleError.bind(this));
  }

  remove(model): Promise<any> {

    const url = environment.serverUrl + this.getApiEndPoint() + '/' + model.id;

    return this.http.delete(url, model)
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
      .then(response => response)
      .catch(this.handleError.bind(this));
  }

  getById(id): Promise<any> {
    let URL = environment.serverUrl + this.getApiEndPoint() + "/" + id;
    return this.http.get(URL)
      .toPromise()
      .then(response =>
        response.json()
      )
      .catch(this.handleError);
  }


  search(query): Promise<any[]> {

    const URL = environment.serverUrl + this.getApiEndPoint() + '/search/?query=' + query;

    console.log(URL);
    return this.http.get(URL)
      .toPromise()
      .then(response =>
        response.json() as any[]
      )
      .catch(this.handleError);
  }

  // <----------------- <EMAIL> --------------------> //

  sendMail(mail): Promise<any> {
    const URL = environment.serverUrl + Constants.API_METHOD_MAIL_SEND;
    const headers = new Headers();
    console.log('mail to send ', mail);

    headers.append('Content-Type', 'application/json');
    return this.http.post(URL, JSON.stringify(mail), { headers: headers })
      .toPromise()
      .then(response =>
        response.json()
      )
      .catch(this.handleError);
  }


  sendContact(mail: any): Promise<any> {
    const URL = environment.serverUrl + Constants.API_METHOD_MAIL_CONTACT;
    const headers = new Headers();

    console.log('mail to send ', mail);

    headers.append('Content-Type', 'application/json');
    return this.http.post(URL, JSON.stringify(mail), { headers: headers })
      .toPromise()
      .then(response =>
        response.json()
      )
      .catch(this.handleError);
  }

    // <----------------- </EMAIL> --------------------> //



  handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
