import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { BaseService } from './base.service';
import { environment } from 'environments/environment';

@Injectable()
export class SuscriptorService extends BaseService {

  getApiEndPoint() {
    return Constants.API_METHOD_SUSCRIPTORS
  }
}
