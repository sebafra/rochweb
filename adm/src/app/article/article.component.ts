import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { BaseService } from '../services/base.service';
import { CategoryService } from '../services/category.service'
import { BaseComponent } from '../base/base.component';
import { SubcategoryService } from '../services/subcategory.service';
import { environment } from 'environments/environment';
import { Constants } from 'app/app.constants';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass'],
  providers: [ArticleService, CategoryService, SubcategoryService]
})
export class ArticleComponent extends BaseComponent {
  categories: any = [];
  subcategories: any = [];
  images: any = [];
  imagesUrl: String = '';
  file: File;
  selectedType: any = '';
  imagesToRemove: any = [];
  categorySelected;
  loading = false;
  user: any;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public articleService: ArticleService,
    public categoryService: CategoryService,
    public subcategoryService: SubcategoryService
  ) {
    super(router, formBuilder, route, toastr, vcr, <BaseService>articleService)
    this.imagesUrl = environment.imagesUrl
    this.user = Constants.LOGGED_USER;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit () {
    super.ngOnInit()
    this.categoryService.getAll({})
      .then(res => this.categories = res)
      .catch(err => console.log(err))
  }

  getBasesURI() {
    return '/articles';
  }

  getFormNew() {
    return this.formBuilder.group({
      name: [null],
      subcategory: [null],
      category: [null],
      description: [null],
      images: [null],
      price: [null],
      condition: [null]
    })
  }

  getFormEdit(item) {
    console.log('el vehiculo a editar:', item)
    this.images = item.images;
    this.subcategoryService.getAll({ category: item.category })
      .then(res => {
        this.subcategories = res
        console.log(this.subcategories)
      })
      .catch(err => console.log(err))

    return this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      category: [item.category, Validators.required],
      subcategory: [item.subcategory, Validators.required],
      description: [item.description],
      images: [item.images],
      price: [item.price],
      user: [item.user],
      condition: [item.condition]
    })
  }

  onChange(event: EventTarget) {
      const eventObj: MSInputMethodContext = <MSInputMethodContext>event
      const target: HTMLInputElement = <HTMLInputElement>eventObj.target
      const files: FileList = target.files
      this.file = files[0]
      console.log('el Archivo es: ', this.file)
      this.loading = true;
      this.articleService.createImage(this.file).then(data => {
          console.log(JSON.stringify(data))
          this.images.push(data.file)
          console.log("this.images",this.images)
          this.loading = false;

      })
  }

  logForm(values) {
    values.user = this.user.id;
    values.images = this.images;
    console.log('new', values.new);

    // this.articleService.deleteFiles(this.imagesToRemove)
    //   .then(res =>
    //     console.log('response', res)
    //   )
      super.logForm(values)
  }

  deleteImage(event: EventTarget) {
    console.log(event);
    const index = this.images.findIndex(el => el === event);
    this.imagesToRemove.push(this.images.splice(index, 1)[0]);
  }

  changeCategory(event) {
    console.log(event);
   const category = event.target.value
    this.subcategoryService.getAll({category})
      .then(res => {
        this.subcategories = res
        console.log(this.subcategories)
      })
      .catch(err => console.log(err))
  }


}
