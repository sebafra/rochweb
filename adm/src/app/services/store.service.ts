import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Router, CanActivate } from '@angular/router'
import { environment } from '../../environments/environment'
import 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { Constants } from '../app.constants';

@Injectable()
export class StoreService implements CanActivate {
  usersUrl: string

  constructor(private http: Http, private router: Router) {
    this.usersUrl = environment.serverUrl + Constants.API_METHOD_LOGIN
  }

  signin(values) {
    const body = JSON.stringify(values)
    const headers = new Headers({ 'Content-Type': 'application/json' })

    return new Promise(resolve => {
      this.http.post(this.usersUrl, body, { headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        },
          err => {
            console.error(err)
          },
          () => console.log('getAutorizaciones completed')
        )
    })
  }

  login = (res) => {
    console.log(res)
    if (res.status && res.status === 'nok') {
      alert('error en login')
    }
    localStorage.setItem('token', String(res.token))
    this.router.navigateByUrl('/')
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null
  }


  getToken() {
    return  `Bearer ${localStorage.getItem('token')}`;
  }



  public handleError = (error: any) => {
    const { error: { name }, message } = error
    if (name === 'TokenExpiredError') {
      console.log('Tu sesión ha expirado')
    } else if (name === 'JsonWebTokenError') {
      console.log('Ha habido un problema con tu sesión')
    } else {
      console.log(message || 'Ha ocurrido un error. Inténtalo nuevamente')
    }
    this.logout()
  }


  canActivate() {
    console.log('can activate')
    return localStorage.getItem('token') !== null
  }
}
