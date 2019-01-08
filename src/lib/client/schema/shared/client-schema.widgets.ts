

import { InjectionToken } from '@angular/core';

import { Widget, WidgetService } from 'src/lib/widget';

import { ClientSchemaFileManagerComponent } from '../../schema-file/client-schema-file-manager/client-schema-file-manager.component';
import { ClientSchemaCreateFormComponent } from '../client-schema-create-form/client-schema-create-form.component';
import { ClientSchemaUpdateFormComponent } from '../client-schema-update-form/client-schema-update-form.component';
import { ClientSchemaDeleteFormComponent } from '../client-schema-delete-form/client-schema-delete-form.component';
import { ClientSchemaDuplicateFormComponent } from '../client-schema-duplicate-form/client-schema-duplicate-form.component';

export const ClientSchemaCreateWidget = new InjectionToken<Widget>('ClientSchemaCreateWidget');
export const ClientSchemaUpdateWidget = new InjectionToken<Widget>('ClientSchemaUpdateWidget');
export const ClientSchemaDeleteWidget = new InjectionToken<Widget>('ClientSchemaDeleteeWidget');
export const ClientSchemaDuplicateWidget = new InjectionToken<Widget>('ClientSchemaDuplicateWidget');
export const ClientSchemaFileManagerWidget = new InjectionToken<Widget>('ClientSchemaFileManagerWidget');

export function provideClientSchemaCreateWidget() {
  return {
    provide:  ClientSchemaCreateWidget,
    useFactory: (widgetService: WidgetService) => widgetService.create(ClientSchemaCreateFormComponent),
    deps: [WidgetService]
  };
}

export function provideClientSchemaUpdateWidget() {
  return {
    provide:  ClientSchemaUpdateWidget,
    useFactory: (widgetService: WidgetService) => widgetService.create(ClientSchemaUpdateFormComponent),
    deps: [WidgetService]
  };
}

export function provideClientSchemaDeleteWidget() {
  return {
    provide:  ClientSchemaDeleteWidget,
    useFactory: (widgetService: WidgetService) => widgetService.create(ClientSchemaDeleteFormComponent),
    deps: [WidgetService]
  };
}

export function provideClientSchemaDuplicateWidget() {
  return {
    provide:  ClientSchemaDuplicateWidget,
    useFactory: (widgetService: WidgetService) => widgetService.create(ClientSchemaDuplicateFormComponent),
    deps: [WidgetService]
  };
}

export function provideClientSchemaFileManagerWidget() {
  return {
    provide:  ClientSchemaFileManagerWidget,
    useFactory: (widgetService: WidgetService) => widgetService.create(ClientSchemaFileManagerComponent),
    deps: [WidgetService]
  };
}
