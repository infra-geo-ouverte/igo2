import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

import { BehaviorSubject, Subject, zip } from 'rxjs';

import { EntityTransaction, WidgetComponent } from '@igo2/common';
import { LanguageService } from '@igo2/core';
import { Feature, FeatureStore } from '@igo2/geo';
import { uuid } from '@igo2/utils';

import { FeatureImportService } from 'src/lib/feature/shared/feature-import.service';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import {
  ClientSchemaElement,
  ClientSchemaElementTypes
} from '../shared/client-schema-element.interfaces';
import { ClientSchemaElementService } from '../shared/client-schema-element.service';
import { generateOperationTitle } from '../shared/client-schema-element.utils';
import { FeatureImportError} from '../../../feature';

@Component({
  selector: 'fadq-client-schema-element-import-data',
  templateUrl: './client-schema-element-import-data.component.html',
  styleUrls: ['./client-schema-element-import-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaElementImportDataComponent implements OnInit, WidgetComponent {

  projection: string;

  /**
   * File object
   * @internal
   */
  file$: BehaviorSubject<File> = new BehaviorSubject(undefined);

  /**
   * Import error, if any
   * @internal
   */
  errorMessage$: Subject<string> = new Subject();

  /**
   * File input placeholder
   * @internal
   */
  placeholder$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  /**
   * Schema element store
   */
  @Input() store: FeatureStore<ClientSchemaElement>;

  /**
   * Schema element transaction
   */
  @Input() transaction: EntityTransaction;

  /**
   * Schema
   */
  @Input() schema: ClientSchema;

  /**
   * Event emitted on complete
   */
  @Output() complete = new EventEmitter<void>();

  /**
   * Event emitted on cancel
   */
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private clientSchemaElementService: ClientSchemaElementService,
    private featureImportService: FeatureImportService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.resetPlaceholder();
  }

  onSelectFiles(files: File[]) {
    const file = files.length > 0 ? files[0] : undefined;
    if (file === undefined) {
      this.resetPlaceholder();
    } else {
      this.placeholder$.next(file.name);
    }
    this.file$.next(file);
  }

  onImport() {
    const projection = this.projection || 'EPSG:4326';
    zip(
      this.featureImportService.import(this.file$.value, projection),
      this.clientSchemaElementService.getSchemaElementTypes(this.schema.type),
      this.clientSchemaElementService.getSchemaElementGeometryTypes(this.schema.type),
    ) .subscribe(
      (bunch: [Feature[], ClientSchemaElementTypes, string[]]) => this.onImportSuccess(...bunch),
      (error: FeatureImportError) => this.onImportError(error)
    );
  }

  onCancel() {
    this.cancel.emit();
  }

  private onImportSuccess(
    features: Feature[],
    elementTypes: ClientSchemaElementTypes,
    geometryTypes: string[]
  ) {
    this.errorMessage$.next(undefined);

    const elements = features.reduce((acc: ClientSchemaElement[], feature: Feature) => {
      const geometryType = feature.geometry.type;
      if (geometryTypes.indexOf(geometryType) < 0) {
        return acc;
      }

      acc.push({
        type: feature.type,
        projection: feature.projection,
        properties: {
          idElementGeometrique: undefined,
          typeElement: elementTypes[geometryType][0].value,
          etiquette: undefined,
          description: undefined,
          descriptionTypeElement: undefined,
          anneeImage: undefined,
          timbreMaj: undefined,
          usagerMaj: undefined
        },
        geometry: feature.geometry,
        meta: {
          id: uuid()
        },
      });
      return acc;
    }, []);

    if (elements.length === 0) {
      this.onNothingToImport();
      return;
    }

    elements.forEach((element: ClientSchemaElement) => {
      this.transaction.insert(element, this.store, {
        title: generateOperationTitle(element)
      });
    });
    this.complete.emit();
  }

  private onImportError(error: FeatureImportError) {
    console.warn(error.message);
    const messageKey = 'client.schemaElement.importData.error.invalidFile';
    const message = this.languageService.translate.instant(messageKey);
    this.errorMessage$.next(message);
    this.file$.next(undefined);
  }

  private onNothingToImport() {
    const messageKey = 'client.schemaElement.importData.error.nothingToImport';
    const message = this.languageService.translate.instant(messageKey);
    this.errorMessage$.next(message);
    this.file$.next(undefined);
  }

  private resetPlaceholder() {
    const key = 'client.schemaElement.importData.placeholder';
    const placeholder = this.languageService.translate.instant(key);
    this.placeholder$.next(placeholder);
  }

}
