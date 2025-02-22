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

  private valuesMap = new Map<string, string[]>();
  filter = new BehaviorSubject<Map<string, string[]>>(this.valuesMap);

  private filterRemoved = new BehaviorSubject<{
    key: string;
    value: string;
  } | null>(null);
  filterRemoved$ = this.filterRemoved.asObservable();

  constructor(private http: HttpClient) {}

  onFilter(key: string, value: string) {
    if (!this.valuesMap.has(key)) {
      this.valuesMap.set(key, [value]); // Si la clé n'existe pas, créer un tableau avec la valeur
    } else {
      const existingValues = this.valuesMap.get(key) || []; // Récupération des valeurs existantes du filtre
      if (existingValues.includes(value)) {
        // Si la valeur est déjà sélectionnée, la retirer (décocher)
        this.valuesMap.set(
          key,
          existingValues.filter((v) => v !== value)
        );
      } else {
        // Sinon, l'ajouter
        this.valuesMap.set(key, [...existingValues, value]);
      }
    }
    this.filter.next(this.valuesMap);
  }

  onClearFilters() {
    this.valuesMap.clear();
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

  notifyFilterRemoved(key: string, value: string) {
    this.filterRemoved.next({ key, value });
  }
}
