import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-values',
  templateUrl: './filter-values.component.html',
  styleUrls: ['./filter-values.component.scss']
})
export class FilterValuesComponent implements OnInit {
  valuesMap = new Map<string, string>();

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.filter.subscribe((valuesMap) => {
      console.log('Filtres reçus dans FilterValuesComponent :', valuesMap);
      this.valuesMap = valuesMap;
    });
  }

  onDelete(key: string) {
    this.filterService.onDelete(key);
  }
}
