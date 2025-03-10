import { HttpParams } from '@angular/common/http';

export function buildHttpParams(queryParams: { [key: string]: any }): HttpParams {
  let params = new HttpParams();

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined && value !== null) {
      params = params.set(key, value.toString());
    }
  }

  return params;
}