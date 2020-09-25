import { Component, OnInit, Renderer, ViewChild, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ArticleService } from '../../services/article.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../app.constants';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss'],
  providers: [ArticleService]
})
export class TopmenuComponent implements OnInit {
  show: any;
  loading = false;
  scrollPosition: number;
  @ViewChild('wspbtn') wspbtn: ElementRef;
  modalRef: BsModalRef;
  formObject: any = {};
  canSend = false;
  recaptcha_key = Constants.RECAPTCHA_SITE_KEY;
  constructor(
    private renderer: Renderer,
    private formBuilder: FormBuilder,
    private renderer2: Renderer2,
    private modalService: BsModalService,
    private carService: ArticleService
    ) {
    this.renderer.listenGlobal('window', 'scroll', (evt) => { this.updatePosition(evt); });
  }

  ngOnInit() {
    this.formObject = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      description: [null, Validators.required],
    });
  }
  updatePosition(evt) {
    this.scrollPosition = evt.path[1].scrollY;
    // console.log(this.scrollPosition);
    if (this.scrollPosition > 300) {
      this.renderer2.addClass(this.wspbtn.nativeElement, 'show');
    } else {
      this.renderer2.removeClass(this.wspbtn.nativeElement, 'show');
    }
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  sendConsult(values) {
    this.loading = true;
    console.log('Data to send:', values);

    this.carService.sendContact(values)
      .then(data => {
        if (data) {
          this.loading = false;
          this.modalRef.hide();
        } else {
          console.log('Error cargando registr');
        }
      })
      .catch(err => console.log(err));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  showAdmin(){
    window.open("http://vps-1060583-x.dattaweb.com:3100/adm");
    //window.open("http://localhost:3100/adm");
  }


 resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.canSend = true;
  }

}
