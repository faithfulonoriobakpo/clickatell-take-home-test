import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buildHttpParams } from '@shared/helpers/http.helpers';
import { GetProductsParams, Product } from '@app/shared/models/Product';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(queryParams?: GetProductsParams): Observable<Product[]>{
    const params = buildHttpParams(queryParams || {});
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/products`, {
      params
    });
  }

  getProduct(productId: number): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/products/${productId}`);
  }

  updateProduct(productId: number, payload: Partial<Product>): Observable<Product[]>{
    return this.http.put<Product[]>(`${environment.apiBaseUrl}/products/${productId}`, payload);
  }
}
