import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.sass'],
})
export class BaseComponent implements OnInit {
  formObject: any = {};

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public baseService: BaseService
  ) {
    }

  getBasesURI() {
    return ''
  }

  getFormNew() {
    return this.formBuilder.group({});
  }

  getFormEdit(item) {
    return this.formBuilder.group({});
  }

  logForm(values) {

    const self = this;
    console.log('logForm values: ', values)
    if (!values.id) {
      this.baseService.create(values).then((response) => {
          console.log(response);
          if (!response) {
           return ({ message: 'No autorizado' })
          }
          self.showSuccess('Se ha agregado exitosamente!!');
          self.router.navigate([self.getBasesURI()]);

        }, function (reason) {
          console.error(reason);
          self.showError(reason);
        }
      );
    } else {
      this.baseService.update(values).then(
        function (response) {
          console.log(response);
          self.showSuccess('Se ha actualizado exitosamente!!');
          setTimeout(() => {
            self.router.navigate([self.getBasesURI()]);
          }, 500);

        }, function (reason) {
          console.error(reason);
          self.showError(reason);
        }
      );
    }

  }

  showSuccess(message) {
    this.toastr.success(message);
  }

  showError(message) {
    this.toastr.error(message);
  }

  ngOnInit() {
    this.formObject = this.getFormNew();
    this.route.params.subscribe((params: Params) => {
      if (params.id !== 'new') {
        this.loadItem(params.id)
      }
    })
  }

  loadItem(id: string) {
    const self = this;
    this.baseService.getById(id).then(
      function (item) {
        self.formObject = self.getFormEdit(item);
      }, function (reason) {
        self.toastr.error(reason);
      }
    );
  }

}
