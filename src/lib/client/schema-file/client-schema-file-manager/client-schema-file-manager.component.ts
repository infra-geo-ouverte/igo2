import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

import { Subject } from 'rxjs';

import { EntityStore, EntityTableTemplate, WidgetComponent } from '@igo2/common';

import { formatDate } from 'src/lib/utils/date';
import { ClientSchema } from '../../schema/shared/client-schema.interfaces';
import { ClientSchemaFile } from '../shared/client-schema-file.interfaces';
import { ClientSchemaFileService } from '../shared/client-schema-file.service';

@Component({
  selector: 'fadq-client-schema-file-manager',
  templateUrl: './client-schema-file-manager.component.html',
  styleUrls: ['./client-schema-file-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSchemaFileManagerComponent implements OnInit, OnDestroy, WidgetComponent {

  static maxSize = 1024 * 1024 * 10;  // 10mo

  /**
   * Import error, if any
   * @internal
   */
  errorMessage$: Subject<string> = new Subject();

  tableTemplate: EntityTableTemplate = {
    selection: true,
    sort: true,
    columns: [
      {
        name: 'name',
        title: 'Nom'
      },
      {
        name: 'timbreMaj.date',
        title: 'Date de mise à jour',
        valueAccessor: (file: ClientSchemaFile) => {
          const value = file.timbreMaj.date;
          if (!value) { return ''; }
          return formatDate(value);
        }
      }
    ]
  };

  schemaFile: ClientSchemaFile;
  schemaFileData: string | ArrayBuffer;

  store: EntityStore<ClientSchemaFile> = new EntityStore<ClientSchemaFile>([]);

  /**
   * Schema to delete
   */
  @Input() schema: ClientSchema;

  /**
   * Event emitted on complete
   */
  @Output() complete = new EventEmitter<number>();

  /**
   * Event emitted on cancel
   */
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('downloadLink') downloadLink: ElementRef;

  constructor(private clientSchemaFileService: ClientSchemaFileService) {}

  ngOnInit() {
    this.loadClientSchemaFiles();
  }

  ngOnDestroy() {
    this.store.destroy();
  }

  onFileInputChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file.size);
      console.log(ClientSchemaFileManagerComponent.maxSize);
      if (file.size > 0 && file.size < ClientSchemaFileManagerComponent.maxSize) {
        this.createSchemaFile(file);
        this.errorMessage$.next(undefined);
      } else {
        this.errorMessage$.next('client.schemaFile.error.size');
      }
    }
  }

  onDownloadButtonClick() {
    this.downloadSchemaFile();
  }

  onDeleteButtonClick() {
    this.deleteSchemaFile();
  }

  onCloseButtonClick() {
    this.complete.emit(this.store.count);
  }

  onSchemaFileSelectChange(event: {added: ClientSchemaFile[]}) {
    if (event.added.length > 0) {
      this.schemaFile = event.added[0];
    }
  }

  private loadClientSchemaFiles() {
    this.clientSchemaFileService.getClientSchemaFiles(this.schema)
      .subscribe((schemaFiles: ClientSchemaFile[]) => {
        this.store.load(schemaFiles);
      });
  }

  private downloadSchemaFile() {
    const schemaFile = this.schemaFile;
    this.clientSchemaFileService
      .getSchemaFileDownloadLink(schemaFile)
      .subscribe((link: string) => {
        const element = this.downloadLink.nativeElement;
        element.setAttribute('href', link);
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
    this.store.insert(schemaFile);
  }

  private deleteSchemaFile() {
    const schemaFile = this.schemaFile;
    this.clientSchemaFileService.deleteSchemaFile(schemaFile)
      .subscribe(() => this.onDeleteSuccess(schemaFile));
  }

  private onDeleteSuccess(schemaFile: ClientSchemaFile) {
    this.store.delete(schemaFile);
    this.schemaFile = undefined;
  }
}
