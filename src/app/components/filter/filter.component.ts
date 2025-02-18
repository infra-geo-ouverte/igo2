import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showingAdditionalFilters = false;
  form: FormGroup;
  searchControl!: any;

  filterOptions: { [key: string]: string[] } = {}; // Objet dynamique pour stocker les valeurs des différents champs
  originalFilterOptions: { [key: string]: string[] } = {}; //variable pour stocker les données originales avant filtrage

  constructor(
    private readonly fb: FormBuilder,
    private readonly filterService: FilterService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      numero: this.fb.control('')
    });

    this.searchControl = this.fb.control('');

    // Liste des colonnes à récupérer
    const columns = [
      'numero_civique',
      'rue',
      'ville_municipalite',
      'numero_immeuble',
      'direction_immobiliere_nom',
      'nom_immeuble',
      'vocation_principale',
      'region_adminsitrative',
      'type_propriete_ou_location'
    ];

    // Récupération dynamique des données pour chaque champ
    columns.forEach((column) => {
      this.filterService.getValues(column).subscribe((values) => {
        this.filterOptions[column] = values;
        this.originalFilterOptions[column] = [...values]; // Stockage des valeurs originales
      });
    });

    // Appliquer la recherche dynamiquement au champ actuellement ouvert
    this.searchControl.valueChanges.subscribe((value) => {
      const activeFilter = Object.keys(this.showFiltersMap).find(
        (key) => this.showFiltersMap[key]
      );

      if (activeFilter) {
        this.filterOptions[activeFilter] = this.originalFilterOptions[
          activeFilter
        ].filter((item) => item.toLowerCase().includes(value.toLowerCase()));
      }
    });
  }

  onClear() {
    this.form.reset();
    this.searchControl.setValue('');
    this.filterOptions = {};
  }

  onChange(key: string, value: string) {
    this.filterService.onFilter(key, value);
  }

  toggleShowAdditionalFilters() {
    this.showingAdditionalFilters = !this.showingAdditionalFilters;
  }

  showFiltersMap: { [key: string]: boolean } = {};

  toggleFilters(filterName: string) {
    this.showFiltersMap[filterName] = !this.showFiltersMap[filterName];
  }
}
