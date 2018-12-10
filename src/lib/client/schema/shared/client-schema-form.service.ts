import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Validators } from '@angular/forms';

import { ApiService } from 'src/lib/core/api';
import {
  ClientSchemaApiConfig,
  ClientSchemaTypeChoicesResponse
} from './client-schema.interfaces';

import {
  EntityFormTemplate,
  EntityFormField,
  EntityFormFieldAnyInput,
  EntityFormFieldSelectInput,
  EntityFormFieldSelectInputChoice
} from 'src/lib/entity';

type PartialFormField = Partial<EntityFormField<EntityFormFieldAnyInput>>;

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaFormService {

  private clientSchemaTypeChoices: EntityFormFieldSelectInputChoice[];

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject('clientSchemaApiConfig') private apiConfig: ClientSchemaApiConfig
  ) {}

  buildCreateForm(): Observable<EntityFormTemplate> {
    const fields$ = zip(
      this.createIdField({options: {disabled: true}}),
      this.createTypeField(),
      this.createDescriptionField(),
      this.createAnneeField(),
      this.createEtatField()
    );
    return fields$.pipe(
      map((fields: EntityFormField[]) => Object.create({fields}))
    );
  }

  buildUpdateForm(): Observable<EntityFormTemplate> {
    return this.buildCreateForm();
  }

  buildDeleteForm(): Observable<EntityFormTemplate> {
    return of({fields: []});
  }

  buildDuplicateForm(): Observable<EntityFormTemplate> {
    return of({fields: []});
  }

  private createIdField(partial?: PartialFormField): Observable<EntityFormField> {
    return of(this.createField({
      name: 'id',
      title: 'Numéro de schéma',
      options:  {
        cols: 1
      }
    }, partial));
  }

  private createTypeField(
    partial?: PartialFormField
  ): Observable<EntityFormField<EntityFormFieldSelectInput>> {

    return this.getClientSchemaTypeChoices()
      .pipe(
        map((choices: EntityFormFieldSelectInputChoice[]) => {
          return this.createField({
            name: 'type',
            title: 'Type de schéma',
            options:  {
              cols: 1,
              validator: Validators.required
            },
            input: {
              type: 'select',
              choices
            }
          }, partial) as EntityFormField<EntityFormFieldSelectInput>;
        })
      );
  }

  private createDescriptionField(partial?: PartialFormField): Observable<EntityFormField> {
    return of(this.createField({
      name: 'description',
      title: 'Description',
      options:  {
        cols: 2,
        validator: Validators.required
      }
    }, partial));
  }

  private createAnneeField(partial?: PartialFormField): Observable<EntityFormField> {
    return of(this.createField({
      name: 'annee',
      title: 'Année',
      options:  {
        cols: 1,
        validator: Validators.compose([
          Validators.required,
          Validators.pattern(/^(20[\d]{2})$/)
        ])
      }
    }, partial));
  }

  private createEtatField(partial?: PartialFormField): Observable<EntityFormField> {
    return of(this.createField({
      name: 'etat',
      title: 'État',
      options: {
        cols: 1
      }
    }, partial));
  }

  private createField(base: EntityFormField, partial?: PartialFormField): EntityFormField {
    partial = partial || {};
    const options = Object.assign({}, base.options || {}, partial.options || {});
    const input = Object.assign({}, base.input || {}, partial.input || {});
    return Object.assign(base, {options, input});
  }

  private getClientSchemaTypeChoices(): Observable<EntityFormFieldSelectInputChoice[]> {
    if (this.clientSchemaTypeChoices !== undefined) {
      return of(this.clientSchemaTypeChoices);
    }

    const url = this.apiService.buildUrl(this.apiConfig.domains.type);
    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaTypeChoicesResponse) => {
          return this.extractSchemaTypeChoicesFromResponse(response);
        }),
        tap((choices: EntityFormFieldSelectInputChoice[]) => {
          this.cacheClientSchemaTypeChoices(choices);
        })
      );
  }

  private extractSchemaTypeChoicesFromResponse(
    response: ClientSchemaTypeChoicesResponse
  ): EntityFormFieldSelectInputChoice[] {
    const items = response.data || [];
    return items.map(item => Object.create({
      value: item.code,
      title: item.descriptionAbregeeFrancais
    }));
  }

  private cacheClientSchemaTypeChoices(choices: EntityFormFieldSelectInputChoice[]) {
    this.clientSchemaTypeChoices = choices;
  }
}
