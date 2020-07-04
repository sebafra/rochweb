import { Component, OnInit, TemplateRef } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CategoryService } from '../services/category.service';
import { SubcategoryService } from '../services/subcategory.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [ArticleService, SubcategoryService]
})
export class CatalogComponent implements OnInit {
  articles: any = [];
  articlesFiltered: any = [];
  objectKeys = Object.keys;

  textSearch: any = '';
  years: any = [];
  categorys: any = [];
  subcategorys: any = [];
  new: Boolean;
  img_url_base: any = environment.imagesUrl;
  loader: any = './assets/img/loader.gif';
  offset: 100;
  modalRef: BsModalRef;
  filters: any = {};
  count: any = Object.keys(this.filters).length;
  private sub: any;
  searchResult: any = [];

  categorySelected: any ;
  subcategorySelected: any;
  yearSelected: any ;

  constructor(
    private modalService: BsModalService,
    private subcategoryService: SubcategoryService,
    public carService: ArticleService,
    public router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log('parametros', params);

      for (const prop in params) {
        if (params.hasOwnProperty(prop)) {
          this.filters[prop] = params[prop];
      }
    }
    console.log('filters ', this.filters);
    });
    this.loadArticles();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadArticles() {
    this.loader = true;
    this.carService.getAllSorted(this.filters, null, { timestamp: 1 }, ['category', 'subcategory'])
      .then(res => {
        this.articlesFiltered = res;
        this.loader = false;
        console.log('this.articlesFiltered: ', this.articlesFiltered);
        return this.carService.getAllSorted({}, null, { timestamp: 1 }, ['category', 'subcategory']);
      })
      .then(res => {
        this.articles = res;
        console.log('All articles: ', this.articles);
        this.getCategories();
        this.getYears();
      });
  }

  showVehicle(item) {
    this.router.navigate(['/article', item.id]);
  }

  deleteFilter(prop) {
    console.log('prop', prop);
    console.log('filtros', this.filters);
    delete this.filters[prop];
  }

  search(event) {
    const value = event.target.value.trim();
    this.filters = {};
    console.log('value: ', value);
    // this.loader = true;
    this.carService.search(value)
      .then(response => {
        const res: any = response;
        console.log({ response });
        this.articlesFiltered = res.articles;
        this.loader = false;
      })
      .catch(error => {
        console.log({ error });
        alert(error.message);
        this.articlesFiltered = [];
        this.loader = false;
      });
  }

  deleteFilters() {
    this.filters = {};
  }

  checkFilters() {
    this.count = Object.keys(this.filters).length;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submitFilters () {
    console.log('submit filters');

  }

  filterProperties () {
    return Object.keys(this.filters);
  }

getYears () {
  for (let i = 0; i < this.articles.length; i++) {
    if (this.years.filter(el => {
      return (el === this.articles[i].year);
    }).length <= 0) {
      this.years.push(this.articles[i].year);
    }
  }
  console.log('years: ', this.years);

}
 getCategories () {

   for (let i = 0; i < this.articles.length; i++) {
     if (this.categorys.filter(el => {
       return (el._id === this.articles[i].category._id);
      }).length <= 0) {
        this.categorys.push(this.articles[i].category);
      }
    }
    console.log('categorys: ', this.categorys);
  }

  changeSubcategories(event) {
    const category = event.target.value;
    console.log(category);
    this.subcategoryService.getAll({ category })
      .then(res => {
        this.subcategorys = res;
        console.log(this.subcategorys);
      })
      .catch(err => console.log(err));
  }

  filterByModal() {
    this.filters = {};
    // if (this.new === undefined) {
    // }

    this.filters.new = this.new;
    this.filters.category = this.categorySelected;
    this.filters.subcategory = this.subcategorySelected;
    this.filters.year = this.yearSelected;
    for (const key in this.filters) {

      if (this.filters.hasOwnProperty(key) && !this.filters[key]) {
          delete this.filters[key];
      }
    }
    console.log('this.filters ', this.filters);
    this.carService.getAllSorted(this.filters, null, { timestamp: 1 }, ['category', 'subcategory'])
      .then(res => {
        this.articlesFiltered = res;
        console.log('this.articlesFiltered: ', this.articlesFiltered);
      });
    this.modalRef.hide();
  }


   names(item) {
    console.log('item to add map', item);
    // tslint:disable-next-line:max-line-length
    const nombres: any = [
      ['new', this.filters.new === 'true' ? '0km' : 'Usados'],
      ['opportunity', 'Oportunidad'],
      ['newest', 'Novedad'],
      ['subcategory', 'Subcategoryo'],
      ['category', 'Marca']];
     const miMapa = new Map(nombres);

     return miMapa.get(item);
    }
}
