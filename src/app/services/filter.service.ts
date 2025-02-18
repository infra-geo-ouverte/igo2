import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private apiUrl =
    'http://vps-5d30fe87.vps.ovh.ca:3000/v1/values/immeublesVw2?column=';

  private valuesMap = new Map<string, string>();
  filter = new BehaviorSubject<Map<string, string>>(this.valuesMap);

  constructor(private http: HttpClient) {}

  onFilter(key: string, value: string) {
    this.valuesMap.set(key, value);
    this.filter.next(this.valuesMap);
  }

  onDelete(key: string) {
    this.valuesMap.delete(key);
    this.filter.next(this.valuesMap);
  }

  getValues(column: string): Observable<string[]> {
    return this.http
      .get<{ [key: string]: string | null }[]>(`${this.apiUrl}${column}`)
      .pipe(
        map((data) =>
          data
            .map((item) => item[column] || '')
            .filter((value) => value.trim() !== '')
        )
      );
  }
}
