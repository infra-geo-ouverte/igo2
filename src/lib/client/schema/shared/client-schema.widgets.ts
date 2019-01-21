

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

export function clientSchemaCreateWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaCreateFormComponent);
}

export function provideClientSchemaCreateWidget() {
  return {
    provide:  ClientSchemaCreateWidget,
    useFactory: clientSchemaCreateWidgetFactory,
    deps: [WidgetService]
  };
}

export function clientSchemaUpdateWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaUpdateFormComponent);
}

export function provideClientSchemaUpdateWidget() {
  return {
    provide:  ClientSchemaUpdateWidget,
    useFactory: clientSchemaUpdateWidgetFactory,
    deps: [WidgetService]
  };
}

export function clientSchemaDeleteWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaDeleteFormComponent);
}

export function provideClientSchemaDeleteWidget() {
  return {
    provide:  ClientSchemaDeleteWidget,
    useFactory: clientSchemaDeleteWidgetFactory,
    deps: [WidgetService]
  };
}

export function clientSchemaDuplicateWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaDuplicateFormComponent);
}

export function provideClientSchemaDuplicateWidget() {
  return {
    provide:  ClientSchemaDuplicateWidget,
    useFactory: clientSchemaDuplicateWidgetFactory,
    deps: [WidgetService]
  };
}

export function clientSchemaFileManagerFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaFileManagerComponent);
}

export function provideClientSchemaFileManagerWidget() {
  return {
    provide:  ClientSchemaFileManagerWidget,
    useFactory: clientSchemaFileManagerFactory,
    deps: [WidgetService]
  };
}
