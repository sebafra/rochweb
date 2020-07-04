import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Constants } from '../app.constants';
import { environment } from '../../environments/environment';

@Injectable()
export class ArticleService extends BaseService {

  getApiEndPoint() {
    return Constants.API_METHOD_ARTICLES;
  }

}
