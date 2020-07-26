import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';
import { Router, CanActivate } from '@angular/router'
import { environment } from '../../environments/environment'
import 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { Constants } from '../app.constants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StoreService implements CanActivate {
  usersUrl: string

  private adminSource = new BehaviorSubject<boolean>(false);
  currentAdmin = this.adminSource.asObservable();

  private loginSource = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loginSource.asObservable();

  private user = new BehaviorSubject<any>(undefined);
  userData = this.user.asObservable();

  constructor(private http: Http, private router: Router) {
    this.usersUrl = environment.serverUrl + Constants.API_METHOD_LOGIN
  }

  changeAdmin(adminStatus: boolean) {
    console.log("Show admin: ",adminStatus);
    this.adminSource.next(adminStatus);
  }
  changeLogin(loginStatus: boolean) {
    console.log("Show isLoggedIn: ",loginStatus);
    this.loginSource.next(loginStatus);
  }
  setUserData(userParams: any) {
    console.log("Show User: ",userParams);
    this.user.next(userParams);
  }

  signin(values) {
    const body = JSON.stringify(values)
    const headers = new Headers({ 'Content-Type': 'application/json' })

    return new Promise((resolve,reject) => {
      this.http.post(this.usersUrl, body, { headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        },
          err => {
            let e = err.json();
            reject(e.message)
          },
          () => console.log('getAutorizaciones completed')
        )
    })
  }

  login(res) {
    console.log(res)
    if (res.status && res.status === 'nok') {
      alert('error en login')
    }
    localStorage.setItem(Constants.STORAGE.user, JSON.stringify(res.user));
    localStorage.setItem('token', String(res.token))
    Constants.LOGGED_USER = res.user;
    this.changeLogin(true);
    this.setUserData(res.user);
    if(res.user.role == 0){
      Constants.IS_ADMIN_LOGIN = true;
      this.changeAdmin(true);
    }
    this.router.navigateByUrl('/')
  }

  logout() {
    //localStorage.clear()
    localStorage.removeItem(Constants.STORAGE.user);
    localStorage.removeItem('token');
    this.changeLogin(false);
    this.setUserData(undefined);
    this.router.navigateByUrl('/login')
  }

  loadUserData() {
    let user: any = JSON.parse(localStorage.getItem(Constants.STORAGE.user));
    console.log("-------- loadUserData --------", user);
    if(user){
      Constants.LOGGED_USER = user;
      this.setUserData(user);
      if (user.role == 0) {
        this.changeAdmin(true);
        console.log("-------- Admin ROLE: true --------");
      }
    }
  }

  canActivate() {
    console.log('can activate')
    let res = localStorage.getItem('token') !== null
    if (!res) {
      this.router.navigate(['login'])
    } else {
      this.changeLogin(true);
    }
    return res
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

}
