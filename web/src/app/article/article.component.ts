import { Component, OnInit, TemplateRef } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {
  articles: any = [];
  article: any = {};
  img_url_base: any = environment.imagesUrl;
  loading = false;
  loader: any = './assets/img/loader.gif';
  offset: 100;
  imageSelected: String;
  modalRef: BsModalRef;
  formObject: any = {};
  article_id: any = '';
  canSend = false;
  href: any;
  twitter: any;
  whatsapp: any;
  recaptcha_key = Constants.RECAPTCHA_SITE_KEY;

  constructor(
    private articleService: ArticleService,
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private modalService: BsModalService

  ) {
   this.route.params.subscribe(params => {
      this.article_id = params.id;
    });
   }

  ngOnInit() {
      this.loadArticles(this.article_id);
      //TODO
      const url = `http://www.montrer.com.ar/article/${this.article_id}`;
      this.href = encodeURI(url);

      this.formObject = this.formBuilder.group({
        name: [null, Validators.required],
        lastname: [null, Validators.required],
        email: [null, Validators.required],
        description: [null, Validators.required],
      });
  console.log( this.formObject);
  }
  loadArticles(_id) {
    this.articleService.getAllSorted({ _id }, 1, {}, [{ "path": "subcategory", "populate": { "path": "category" }},'user'])
      .then(res => {
        this.article = res[0];
        console.log(this.article);
        this.imageSelected = this.article.images[0];
        //return this.articleService.getAllSorted({ opportunity: true }, 3, { timestamp: 1 }, [{ "path": "subcategory", "populate": { "path": "category" } }]);
      })
      .then(
        result => {
          this.articles = result;
          // tslint:disable-next-line:max-line-length
          this.twitter = encodeURI(`https://twitter.com/intent/tweet/?text=Te comparto ${this.article.subcategory.category.name} ${this.article.subcategory.name} de ${this.href}`);
          // tslint:disable-next-line:max-line-length
          this.whatsapp = encodeURI(`https://api.whatsapp.com/send?text=Te comparto ${this.article.subcategory.category.name} ${this.article.subcategory.name} de ${this.href}`);
          console.log(this.twitter);

        }
      )
      .catch(err => console.log(err));
  }

  changeImageSelected(image) {
    this.imageSelected = image;
  }

  showArticle(item) {
    this.router.navigate(['/article', item.id]);
  }


  sendConsult(values) {
    this.loading = true;
    values.id = this.article._id;
    values.article = this.article;
    values.time = Date.now();
    console.log('Data to send:', values);

    this.articleService.sendContact(values)
      .then(data => {
        if (data) {
          this.loading = false;
          this.modalRef.hide();
        } else {
          console.log('Error articlegando registr');
        }
      })
      .catch(err => console.log(err));
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.canSend = true;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
