import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @ViewChild('searchDiv') searchDiv!: ElementRef;

  showingAdditionalFilters = false;
  form: FormGroup;
  searchControl!: any;

  // Objet dynamique pour stocker les valeurs des différents champs
  filterOptions: { [key: string]: string[] } = {};

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
      });
    });

    // Mise à jour des options filtrées en fonction de la recherche
    this.searchControl.valueChanges.subscribe((value) => {
      this.filterOptions['numero_civique'] = this.filterOptions[
        'numero_civique'
      ].filter((num) => num.toLowerCase().includes(value.toLowerCase()));
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

  onFocus() {
    this.renderer.addClass(this.searchDiv.nativeElement, 'active-border');
  }

  onBlur() {
    this.renderer.removeClass(this.searchDiv.nativeElement, 'active-border');
  }
}
