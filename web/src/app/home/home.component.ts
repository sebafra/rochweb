import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Constants } from '../app.constants';
import { BannerService } from '../services/banner.service';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';
import { ArticleComponent } from '../article/article.component';

declare var Pixlee: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [BannerService, ArticleService]
})
export class HomeComponent implements OnInit {
  articles: any = [];
  img_url_base: any = environment.imagesUrl;
  loader: any = './assets/img/loader.gif';
  offset: 100;
  banners: any = [];
  searchResult: any = [];

  constructor(
    // private noticiaService: NoticiaService,
    private bannerService: BannerService,
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadArticles();
    this.loadBanner();
    //this.showWidget();
  }

  loadBanner() {
    this.bannerService.getAllSorted({}, null, { order: 1 }, []).then(
      result => {
        this.banners = result;
      }
    );
  }

  loadArticles() {
    this.articleService.getAllSorted({}, 9, { timestamp: 1 }, [{"path": "subcategory", "populate": { "path": "category" }}]).then(
      result => {
        this.articles = result;
      }
    );
  }

  showArticle(item) {
    this.router.navigate(['/article', item.id]);
  }

  showWidget() {
    Pixlee.init({ apiKey: 'kymLYwFkZ3GvZacx2vkJ' });
    Pixlee.addSimpleWidget({ widgetId: '8996' });
  }

  toCatalog(item) {
    const category = item.category._id;
    const subcategory = item.subcategory._id;
    const article = { category, subcategory };
    console.log('article ', article);
    this.router.navigate(['catalog/', article]);

  }


  search(event) {
    const value = event.target.value.trim();
    if (value === '') {
      this.searchResult = [];
      return;
    }
    console.log('value: ', value);
    this.articleService.search(value)
      .then(response => {
        const res: any = response;
        console.log({response});
        this.searchResult = res.articles;
      })
      .catch(error => {
        console.log({error});
        alert(error.message);
        this.searchResult = [];
      });
  }

}
