import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showingAdditionalFilters = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly filterService: FilterService
  ) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      numero: this.fb.control('')
    });
  }

  onClear() {}

  onChange(key: string, value: string) {
    this.filterService.onFilter(key, value);
  }

  toggleShowAdditionalFilters() {
    this.showingAdditionalFilters = !this.showingAdditionalFilters;
  }
}
