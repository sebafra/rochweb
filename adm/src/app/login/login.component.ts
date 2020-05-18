import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  formObject: any = {value: null}

  constructor(public formBuilder: FormBuilder, private storeService: StoreService, private router: Router) { }

  ngOnInit() {
    this.formObject = this.formBuilder.group({
      user: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onSubmit(values) {
      console.log(JSON.stringify(values))
      this.storeService.signin(values)
          .then(data => {
            const res: any = data;
            console.log(res);
            if (res.accessToken) {
              this.storeService.login(res);
            }else {
              alert('Error al iniciar Sesion, usuario o contraseña incorrecta')
            }

          })
  }
}
