import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ProductCatalogRoutingModule } from './product-catalog-routing.module';
import { ProductCatalogComponent } from './product-catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ProductCatalogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductCatalogRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class ProductCatalogModule { }
