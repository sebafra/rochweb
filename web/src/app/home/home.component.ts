import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Constants } from '../app.constants';
import { BannerService } from '../services/banner.service';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';
import { ArticleComponent } from '../article/article.component';
import { SubcategoryService } from '../services/subcategory.service';
import { CategoryService } from '../services/category.service';

declare var Pixlee: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [BannerService, ArticleService, SubcategoryService, CategoryService]
})
export class HomeComponent implements OnInit {
  articles: any = [];
  img_url_base: any = environment.imagesUrl;
  loader: any = './assets/img/loader.gif';
  offset: 100;
  banners: any = [];
  subcategories: any = [];
  categories: any = [];
  categorySelected: any = "all";
  searchResult: any = [];
  filters: any = {};
  searchText: string;

  constructor(
    // private noticiaService: NoticiaService,
    private bannerService: BannerService,
    private articleService: ArticleService,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadArticles();
    this.loadBanner();
    //this.showWidget();
    this.loadCategories();
  }

  loadBanner() {
    this.bannerService.getAllSorted({}, null, { order: 1 }, []).then(
      result => {
        this.banners = result;
      }
    );
  }

  loadArticles() {
    this.filters.enabled = true;
    this.articleService.getAllSorted(this.filters, 100, { timestamp: 1 }, [{ "path": "subcategory", "populate": { "path": "category" } }]).then(
      result => {
        this.articles = result;
      }
    );
  }
  loadSubcategories() {
    this.subcategoryService.getAllSorted({}, 100, {}, [{ "path": "category" }]).then(
      result => {
        this.subcategories = result;
        console.log("Subcategories: ", this.subcategories)
      }
    );
  }
  loadCategories() {
    this.categoryService.getAllSorted({}, 100, {}, []).then(
      result => {
        this.categories = result;
        console.log("categories: ", this.categories)
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
    let filters: any = {};
    if (this.searchText && this.searchText !== '') {
      filters.name = this.searchText;
    }

    if (this.categorySelected != "all") {
      filters.category = this.categorySelected;
    }
    console.log("Filters to send: ", filters);
    this.router.navigate(['catalog/', filters]);

  }
  searchAlt(event) {
    const value = event.target.value.trim();
    if (value === '') {
      this.filters.name = [];
      return;
    } else {
      this.filters.name = value;
    }
    this.loadArticles();
    console.log('value: ', value);
  }


  searchOld(event) {
    const value = event.target.value.trim();
    if (value === '') {
      this.searchResult = [];
      return;
    }
    console.log('value: ', value);
    this.articleService.search(value)
      .then(response => {
        const res: any = response;
        console.log({ response });
        this.searchResult = res.articles;
      })
      .catch(error => {
        console.log({ error });
        alert(error.message);
        this.searchResult = [];
      });
  }

}
