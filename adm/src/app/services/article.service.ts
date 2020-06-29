import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { BaseService } from './base.service';
import { environment } from 'environments/environment';

@Injectable()
export class ArticleService extends BaseService {

  getApiEndPoint() {
    return Constants.API_METHOD_ARTICLES;
  }

  createImage(file): Promise<any> {

    const URL = environment.serverUrl + Constants.API_FILE_UPLOAD;

    const fd = new FormData();
    fd.append('file', file);

    return this.http.post(URL, fd)
      .toPromise()
      .then(response =>
        response.json()
      )
      .catch(this.handleError);
  }
}
