import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showingAdditionalFilters = false;
  form: FormGroup;
  searchControls: { [key: string]: FormControl } = {};

  filterOptions: { [key: string]: string[] } = {}; // Contient les options filtrées
  originalFilterOptions: { [key: string]: string[] } = {}; // Stocke les valeurs originales des filtres

  showFiltersMap: { [key: string]: boolean } = {}; // Indique quel filtre est actuellement ouvert
  selectedFilters: { [key: string]: string[] } = {};

  constructor(
    private readonly fb: FormBuilder,
    private readonly filterService: FilterService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      numero: this.fb.control('')
    });

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
      this.searchControls[column] = new FormControl('');
      this.filterService.getValues(column).subscribe((values) => {
        this.filterOptions[column] = values;
        this.originalFilterOptions[column] = [...values]; // Stockage des valeurs originales.une copie pour réinitialisation
        this.selectedFilters[column] = [];
      });

      // Appliquer la recherche dynamiquement au champ actuellement ouvert
      this.searchControls[column].valueChanges.subscribe((value) => {
        this.filterOptions[column] = this.originalFilterOptions[column].filter(
          (item) => item.toLowerCase().includes(value.toLowerCase())
        );
      });
    });

    this.filterService.filterRemoved$.subscribe((removedFilter) => {
      if (removedFilter) {
        const { key, value } = removedFilter;
        this.selectedFilters[key] = this.selectedFilters[key].filter(
          (v) => v !== value
        );
      }
    });
  }

  onClear() {
    this.form.reset();
    Object.keys(this.searchControls).forEach((key) =>
      this.searchControls[key].setValue('')
    );
    this.filterOptions = {};
    this.selectedFilters = {};
  }

  onChange(key: string, value: string) {
    if (!this.selectedFilters[key]) {
      this.selectedFilters[key] = [];
    }
    const index = this.selectedFilters[key].indexOf(value);
    if (index === -1) {
      this.selectedFilters[key].push(value);
    } else {
      this.selectedFilters[key].splice(index, 1);
    }
    this.filterService.onFilter(key, value);
  }

  toggleShowAdditionalFilters() {
    this.showingAdditionalFilters = !this.showingAdditionalFilters;
  }

  toggleFilters(filterName: string) {
    this.showFiltersMap[filterName] = !this.showFiltersMap[filterName];
  }

  resolveTypeValue(type_propriete_ou_location) {
    if (type_propriete_ou_location.toLowerCase() === "l") {
      return "Location";
    } else if (type_propriete_ou_location.toLowerCase() === "p") {
      return "Propriété";
    } else {
      return type_propriete_ou_location;
    }
  }
}
