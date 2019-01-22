import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';

import { Observable, of, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { LanguageService } from '@igo2/core';

import { ApiService } from 'src/lib/core/api';
import {
  ClientSchemaApiConfig,
  ClientSchemaTypeChoicesResponse,
  ClientSchemaEtatChoicesResponse
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
  private clientSchemaEtatChoices: EntityFormFieldSelectInputChoice[];

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private languageService: LanguageService,
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
      map((fields: EntityFormField[]) => Object.create({
        fields,
        submitLabel: this.languageService.translate.instant('save'),
        cancelLabel: this.languageService.translate.instant('cancel')
      }))
    );
  }

  buildUpdateForm(): Observable<EntityFormTemplate> {
    return this.buildCreateForm();
  }

  buildDeleteForm(): Observable<EntityFormTemplate> {
    return of({
      fields: [],
      submitLabel: this.languageService.translate.instant('yes'),
      cancelLabel: this.languageService.translate.instant('no')
    });
  }

  buildDuplicateForm(): Observable<EntityFormTemplate> {
    return of({
      fields: [],
      submitLabel: this.languageService.translate.instant('yes'),
      cancelLabel: this.languageService.translate.instant('no')
    });
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

  private createEtatField(
    partial?: PartialFormField
  ): Observable<EntityFormField<EntityFormFieldSelectInput>> {

    return this.getClientSchemaEtatChoices()
      .pipe(
        map((choices: EntityFormFieldSelectInputChoice[]) => {
          return this.createField({
            name: 'etat',
            title: 'État',
            options:  {
              cols: 1
            },
            input: {
              type: 'select',
              choices
            }
          }, partial) as EntityFormField<EntityFormFieldSelectInput>;
        })
      );
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

  private getClientSchemaEtatChoices(): Observable<EntityFormFieldSelectInputChoice[]> {
    if (this.clientSchemaEtatChoices !== undefined) {
      return of(this.clientSchemaEtatChoices);
    }

    const url = this.apiService.buildUrl(this.apiConfig.domains.etat);
    return this.http
      .get(url)
      .pipe(
        map((response: ClientSchemaEtatChoicesResponse) => {
          return [{value: undefined, title: ''}].concat(
            this.extractSchemaEtatChoicesFromResponse(response)
          );
        }),
        tap((choices: EntityFormFieldSelectInputChoice[]) => {
          this.cacheClientSchemaEtatChoices(choices);
        })
      );
  }

  private extractSchemaEtatChoicesFromResponse(
    response: ClientSchemaEtatChoicesResponse
  ): EntityFormFieldSelectInputChoice[] {
    const items = response.data || [];
    return items.map(item => Object.create({
      value: item.code,
      title: item.descriptionAbregeeFrancais
    }));
  }

  private cacheClientSchemaEtatChoices(choices: EntityFormFieldSelectInputChoice[]) {
    this.clientSchemaEtatChoices = choices;
  }
}
