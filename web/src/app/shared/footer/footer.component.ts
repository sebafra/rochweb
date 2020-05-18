import { Component, OnInit } from '@angular/core';
import { SuscriptorService } from '../../services/suscriptor';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [SuscriptorService]
})

export class FooterComponent implements OnInit {
  suscriptor: any = '';

  constructor(
    private suscriptorService: SuscriptorService,
    public toastr: ToastsManager
  ) {
  }

  ngOnInit() {
  }

  suscription() {
    console.log('suscriptor: ', this.suscriptor);
    if (this.validateEmail(this.suscriptor)) {
      this.suscriptorService.create({email: this.suscriptor})
        .then(res => {
          console.log(res);
          this.suscriptor = '';
          alert('La suscripcion se realizo con exito');
        })
        .catch(err => alert(`Ya existe un suscriptor con este email.`));
    } else {
      alert('Debe ingresar una dirección de correo válida');
    }
  }

  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

  }
}
