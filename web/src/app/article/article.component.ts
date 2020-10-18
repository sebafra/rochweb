import { Component, OnInit, TemplateRef } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../app.constants';

declare const google: any;

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
  related: any = [];
  showCell: Boolean = false;

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
    const url = `${environment.domain}/article/${this.article_id}`;
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
        this.loadMap();
        this.twitter = encodeURI(`https://twitter.com/intent/tweet/?text=Te comparto ${this.article.subcategory.category.name} ${this.article.subcategory.name} de ${this.href}`);
        this.whatsapp = encodeURI(`https://api.whatsapp.com/send?text=Te comparto ${this.article.subcategory.category.name} ${this.article.subcategory.name} de ${this.href}`);
        //return this.articleService.getAllSorted({ opportunity: true }, 3, { timestamp: 1 }, [{ "path": "subcategory", "populate": { "path": "category" } }]);
        this.getRelated(this.article.category)
      })
      .catch(err => console.log(err));
  }
  getRelated(category){
    this.articleService.getAllSorted({ category,_id:{$ne:this.article.id} }, 1, {}, [{ "path": "subcategory", "populate": { "path": "category" } }, 'user'])
      .then(res => {
        for (let index = 0; index < 3; index++) {
          this.related.push(res[index]);
        }
      })
      .catch(err => console.log(err));
  }

  changeImageSelected(image) {
    this.imageSelected = image;
  }

  showArticle(item) {
    this.router.navigate(['/article', item.id]);
  }
  goToCategory(category){
    this.router.navigate(['catalog/', {category: category}]);
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

  loadMap() {
    let map;
    let marker;
    const DALLAS = { lat: 32.7767, lng: -96.7970 };
    let location = { lat: this.article.user.location.coordinates[1], lng: this.article.user.location.coordinates[0] };

    map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 10,
      mapTypeId: 'roadmap',
      maxZoom: 10,
      disableDefaultUI: true
    });

    marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'Hello World!',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 50,
        fillColor: "#F00",
        fillOpacity: 0.4,
        strokeWeight: 0.4
      },
    });
  }

}
