import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  EntityStore,
  EntityTableTemplate,
  getEntityId
} from 'src/lib/entity';
import { WidgetComponent } from 'src/lib/widget';

import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaFile } from '../shared/client-schema-file.interfaces';
import { ClientSchemaFileService } from '../shared/client-schema-file.service';

@Component({
  selector: 'fadq-client-schema-file-manager',
  templateUrl: './client-schema-file-manager.component.html',
  styleUrls: ['./client-schema-file-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaFileManagerComponent implements WidgetComponent, OnInit {

  static tableTemplate: EntityTableTemplate = {
    selection: true,
    sort: true,
    columns: [
      {
        name: 'name',
        title: 'Nom'
      },
      {
        name: 'type',
        title: 'Type'
      },
      {
        name: 'size',
        title: 'Size'
      }
    ]
  };

  public schemaFile: ClientSchemaFile;
  public schemaFileData: string | ArrayBuffer;

  @Input()
  get schema(): ClientSchema {
    return this._schema;
  }
  set schema(value: ClientSchema) {
    this._schema = value;
  }
  private _schema: ClientSchema;

  get store(): EntityStore<ClientSchemaFile> {
    return this._store;
  }
  private _store;

  get tableTemplate(): EntityTableTemplate {
    return ClientSchemaFileManagerComponent.tableTemplate;
  }

  @Output() complete = new EventEmitter<ClientSchema>();
  @Output() cancel = new EventEmitter();

  @ViewChild('downloadLink') downloadLink: ElementRef;

  constructor(private clientSchemaFileService: ClientSchemaFileService) {}

  ngOnInit() {
    this._store = new EntityStore<ClientSchemaFile>();
    this.loadClientSchemaFiles();
  }

  onFileInputChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.createSchemaFile(event.target.files[0]);
    }
  }

  onDownloadButtonClick() {
    this.downloadSchemaFile();
  }

  onDeleteButtonClick() {
    this.deleteSchemaFile();
  }

  onCloseButtonClick() {
    this.cancel.emit();
  }

  onSchemaFileSelectChange(event: {entity: ClientSchemaFile, selected: boolean}) {
    if (event.selected === true) {
      this.schemaFile = event.entity;
    }
  }

  private loadClientSchemaFiles() {
    this.clientSchemaFileService.getClientSchemaFiles(this.schema)
      .subscribe((schemaFiles: ClientSchemaFile[]) => {
        this.store.setEntities(schemaFiles);
      });
  }

  private downloadSchemaFile() {
    const schemaFile = this.schemaFile;
    this.clientSchemaFileService
      .getSchemaFileData(schemaFile)
      .subscribe((data: string | ArrayBuffer) => {
        const element = this.downloadLink.nativeElement;
        element.setAttribute('href', data);
        element.setAttribute('download', schemaFile.name);
        element.click();
      });
  }

  private createSchemaFile(file: File) {
    const schema = this.schema;
    this.clientSchemaFileService
      .createSchemaFile(schema, {p_fichier: file})
      .subscribe((schemaFile: ClientSchemaFile) => this.onCreateSuccess(schemaFile));
  }

  private onCreateSuccess(schemaFile: ClientSchemaFile) {
    this.store.addEntities([schemaFile], true);
  }

  private deleteSchemaFile() {
    const schemaFile = this.schemaFile;
    this.clientSchemaFileService.deleteSchemaFile(schemaFile)
      .subscribe(() => this.onDeleteSuccess(schemaFile));
  }

  private onDeleteSuccess(schemaFile: ClientSchemaFile) {
    this.store.removeEntities([schemaFile], true);
    this.schemaFile = undefined;
  }
}
