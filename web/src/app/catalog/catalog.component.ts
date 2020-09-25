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
  providers: [ArticleService, SubcategoryService, CategoryService]
})
export class CatalogComponent implements OnInit {
  articles: any = [];
  articlesFiltered: any = [];
  objectKeys = Object.keys;
  params: any;

  textSearch: string;
  years: any = [];
  categories: any = [];
  subcategories: any = [];
  subcats: any = [];
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
    private categoryService: CategoryService,
    public articleService: ArticleService,
    public router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log('parametros', params);
      this.params = params;
      // if(this.params){
      //   if(this.params.category){
      //     this.categorySelected = this.params.category
      //   }
      //   if(this.params.text){
      //     this.categorySelected = this.params.text
      //   }
      // }

      for (const prop in params) {
        if (params.hasOwnProperty(prop)) {
          this.filters[prop] = params[prop];
      }
    }
    console.log('filters ', this.filters);
    this.loadArticles();
    this.getCategories();
    this.getAllSubcats();
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadArticles() {
    this.filters.enabled = true;
    this.loader = true;
    if (this.textSearch) {
      this.filters.name = this.textSearch;
    }
    this.articleService.getAllSorted(this.filters, null, { timestamp: 1 }, ['category', 'subcategory'])
      .then(res => {
        this.articles = res;
        this.loader = false;
        console.log('this.articles: ', this.articles);
      })
  }

  showVehicle(item) {
    this.router.navigate(['/article', item.id]);
  }

  deleteFilterOld(prop) {
    console.log('prop', prop);
    console.log('filtros antes', this.filters);
    delete this.filters[prop];
    if (prop == "name") {
      this.textSearch = undefined;
    }
    console.log('filtros despues', this.filters);
    this.loadArticles();
  }
  deleteFilter(item) {
    console.log('filtros antes', this.filters);
    let key = item.key;
    delete this.filters[key];
    if (key == "name") {
      this.textSearch = undefined;
    }
    console.log('filtros despues', this.filters);
    // this.loadArticles();
  }


  deleteFilters() {
    this.filters = {};
    this.textSearch = undefined;
    this.loadArticles();
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
  getCategoryName(item){
    let ret;
    let categoryName = this.categories.filter(el => el.id == item);
    ret = categoryName[0].name;
    return ret
  }
  getSubCategoryName(item){
    let ret;
    let subcategoryName = this.subcats.filter(el => el.id == item);
    ret = subcategoryName[0].name;
    return ret
  }

  getCategories (){
    this.categoryService.getAll({})
      .then(res => {
        this.categories = res;
        this.loader = false;
        console.log('categories: ', this.categories);
      })
  }
  getSubCategories (categoryId){
    this.subcategoryService.getAll({category:categoryId})
      .then(res => {
        this.subcategories = res;
        console.log('subcategories: ', this.subcategories);
      })
  }
  getAllSubcats(){
    this.subcategoryService.getAll({})
      .then(res => {
        this.subcats = res;
        console.log('subcats: ', this.subcats);
      })
  }

  changeCategory(event) {
    const category = event.target.value;
    console.log(category);
    this.getSubCategories(category);
  }

  filterByModalOld() {
    this.filters.category = this.categorySelected;
    this.filters.subcategory = this.subcategorySelected;
    for (const key in this.filters) {

      if (this.filters.hasOwnProperty(key) && !this.filters[key]) {
          delete this.filters[key];
      }
    }
    console.log('this.filters ', this.filters);
    this.articleService.getAllSorted(this.filters, null, { timestamp: 1 }, ['category', 'subcategory'])
      .then(res => {
        this.articlesFiltered = res;
        console.log('this.articlesFiltered: ', this.articlesFiltered);
      });
    this.modalRef.hide();
  }
  filterByModal() {
    this.filters.category = this.categorySelected;
    this.filters.subcategory = this.subcategorySelected;
    // for (const key in this.filters) {

    //   if (this.filters.hasOwnProperty(key) && !this.filters[key]) {
    //       delete this.filters[key];
    //   }
    // }
    console.log('this.filters ', this.filters);
    this.loadArticles();
    this.modalRef.hide();
  }


   names_old(item) {
    console.log('item to add map', item);
    // tslint:disable-next-line:max-line-length
    const nombres: any = [
      //['new', this.filters.new === 'true' ? '0km' : 'Usados'],
      ['name', 'Busqueda'],
      ['subcategory', 'Subcategoría'],
      ['category', 'Categoría']];
     const miMapa = new Map(nombres);

     return miMapa.get(item);
    }
    getName(item){
      let ret: string;
      console.log("get name",item);
      switch (item.key) {
        case "category":
          let categoryName = this.categories.filter(el => el.id == item.value);
          ret = "Categoría: " + categoryName[0].name;
          break;
        case "subcategory":
          if(item.value){
            let subcategoryName = this.subcategories.filter(el => el.id == item.value);
            ret = "Subcategoría: " + subcategoryName[0].name;
          } else {
            ret = "Subcategoría: Todas";
          }
          break;
        case "name":
          ret = "Búsqueda: " + item.value;
          break;
      
        default:
          break;
      }
      return ret
    }
}
