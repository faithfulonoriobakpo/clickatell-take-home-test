import { Component, model, OnDestroy, OnInit } from '@angular/core';
import { GetProductsParams, Product } from '@app/shared/models/Product';
import { ProductCatalogService } from './product-catalog.service';
import { debounceTime, distinctUntilChanged, filter, forkJoin, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  standalone: false,
  styleUrl: './product-catalog.component.scss'
})
export class ProductCatalogComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  price_min!: number;
  price_max!: number;
  searchText: string = '';
  pageNumber: number = 1;
  pageSize: number = 12;
  filters!: Partial<GetProductsParams>;
  searchControl = new FormControl('');
  matSliderForm!: FormGroup;
  loaded: boolean = false;

  readonly clothesCheckBox = model(false);
  readonly electronicsCheckBox = model(false);
  readonly furnitureCheckBox = model(false);

  destroy$ = new Subject<void>();

  constructor(
    private productCatalogService: ProductCatalogService,
    private formBuilder: FormBuilder
  ){
  }

  ngOnInit(): void {
    this.matSliderForm = this.formBuilder.group({
      low: [10],
      high: [10000]
    });

    this.filters = {
      offset: 0,
      limit: 12
    };

    this.initSearch();
    this.fetchProducts();
  }

  initSearch(){
    this.searchControl.valueChanges
    .pipe(
      filter((searchText) => searchText !== null),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchText: string) => {
        this.searchText = searchText;
        this.filters = {...this.filters, title: searchText, offset: 1, limit: 12};

        return this.productCatalogService.getAllProducts(this.filters)
      }),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (res) => {
        this.loaded = true;
        this.products = res;
      }
    })
  }

  filterProductsByPriceRange(){
    this.filters = {
      ...this.filters,
      price_min: this.matSliderForm.value.low,
      price_max: this.matSliderForm.value.high
    };
    this.fetchProducts();
  }

  filterProductsByCategory(){
    // used api doesn't accept multiple categories for filter
    // called the api multiple times and joined the results with the different selected categories

    let requestArray: Observable<Product[]>[] = [];

    if(this.clothesCheckBox()){
      const filter: GetProductsParams = { ...this.filters, categoryId: 1 };
      requestArray = [...requestArray, this.productCatalogService.getAllProducts(filter)];
    }
  
    if(this.electronicsCheckBox()){
      const filter: GetProductsParams = { ...this.filters, categoryId: 2 };
      requestArray = [...requestArray, this.productCatalogService.getAllProducts(filter)];
    }
  
    if(this.furnitureCheckBox()){
      const filter: GetProductsParams = { ...this.filters, categoryId: 3 };
      requestArray = [...requestArray, this.productCatalogService.getAllProducts(filter)];
    }

    const noCategoryChecked = !this.clothesCheckBox() && !this.electronicsCheckBox() && !this.furnitureCheckBox();

    if(noCategoryChecked){
      this.fetchProducts();
    }else{
      forkJoin(requestArray)
      .subscribe({
        next: (res) => {
          this.products = res.flat();
          this.loaded = true;
        }
      })
    }
  }

  fetchProducts(){
    this.productCatalogService.getAllProducts(this.filters)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.loaded = true;
        this.products = res;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
