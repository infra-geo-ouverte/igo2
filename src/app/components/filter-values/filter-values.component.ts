import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-values',
  templateUrl: './filter-values.component.html',
  styleUrls: ['./filter-values.component.scss']
})
export class FilterValuesComponent implements OnInit {
  valuesMap = new Map<string, string[]>();

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.filter.subscribe((valuesMap) => {
      console.log('Filtres reçus dans FilterValuesComponent :', valuesMap);
      this.valuesMap = valuesMap;
    });
  }

  onDeleteValue(key: string, value: string) {
    const values = this.valuesMap.get(key) || [];
    const newValues = values.filter((v) => v !== value);

    if (newValues.length > 0) {
      this.valuesMap.set(key, newValues);
    } else {
      this.valuesMap.delete(key); // Supprime la clé si plus aucune valeur
    }

    this.filterService.filter.next(this.valuesMap);
    this.filterService.notifyFilterRemoved(key, value);
  }

  resolveValue(key, value) {
    if (key === 'type_propriete_ou_location') {
      if (value.toLowerCase() === 'l') {
        return 'Location';
      } else if (value.toLowerCase() === 'p') {
        return 'Propriété';
      }
    }
    return value;
  }
}
