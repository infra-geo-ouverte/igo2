

import { InjectionToken } from '@angular/core';

import { Widget, WidgetService } from '@igo2/common';

import {
  ClientSchemaElementCreateFormComponent
} from '../client-schema-element-create-form/client-schema-element-create-form.component';
import {
  ClientSchemaElementUpdateFormComponent
} from '../client-schema-element-update-form/client-schema-element-update-form.component';
import {
  ClientSchemaElementSliceFormComponent
} from '../client-schema-element-slice-form/client-schema-element-slice-form.component';
import {
  ClientSchemaElementSaverComponent
} from '../client-schema-element-saver/client-schema-element-saver.component';
import {
  ClientSchemaElementUndoComponent
} from '../client-schema-element-undo/client-schema-element-undo.component';
import {
  ClientSchemaElementImportDataComponent
} from '../client-schema-element-import-data/client-schema-element-import-data.component';

export const ClientSchemaElementCreateWidget = new InjectionToken<Widget>('ClientSchemaElementCreateWidget');
export const ClientSchemaElementUpdateWidget = new InjectionToken<Widget>('ClientSchemaElementUpdateWidget');
export const ClientSchemaElementSliceWidget = new InjectionToken<Widget>('ClientSchemaElementSliceWidget');
export const ClientSchemaElementSaverWidget = new InjectionToken<Widget>('ClientSchemaElementSaverWidget');
export const ClientSchemaElementUndoWidget = new InjectionToken<Widget>('ClientSchemaElementUndoWidget');
export const ClientSchemaElementImportDataWidget = new InjectionToken<Widget>('ClientSchemaElementImportDataWidget');

export function clientSchemaElementCreateWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaElementCreateFormComponent);
}

export function provideClientSchemaElementCreateWidget() {
  return {
    provide:  ClientSchemaElementCreateWidget,
    useFactory: clientSchemaElementCreateWidgetFactory,
    deps: [WidgetService]
  };
}

export function clientSchemaElementUpdateWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaElementUpdateFormComponent);
}

export function provideClientSchemaElementUpdateWidget() {
  return {
    provide:  ClientSchemaElementUpdateWidget,
    useFactory: clientSchemaElementUpdateWidgetFactory,
    deps: [WidgetService]
  };
}

export function clientSchemaElementSliceWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaElementSliceFormComponent);
}

export function provideClientSchemaElementSliceWidget() {
  return {
    provide:  ClientSchemaElementSliceWidget,
    useFactory: clientSchemaElementSliceWidgetFactory,
    deps: [WidgetService]
  };
}

export function clientSchemaElementSaverWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaElementSaverComponent);
}

export function provideClientSchemaElementSaverWidget() {
  return {
    provide:  ClientSchemaElementSaverWidget,
    useFactory: clientSchemaElementSaverWidgetFactory,
    deps: [WidgetService]
  };
}

export function clientSchemaElementUndoWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaElementUndoComponent);
}

export function provideClientSchemaElementUndoWidget() {
  return {
    provide:  ClientSchemaElementUndoWidget,
    useFactory: clientSchemaElementUndoWidgetFactory,
    deps: [WidgetService]
  };
}

export function clientSchemaElementImportDataWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaElementImportDataComponent);
}

export function provideClientSchemaElementImportDataWidget() {
  return {
    provide:  ClientSchemaElementImportDataWidget,
    useFactory: clientSchemaElementImportDataWidgetFactory,
    deps: [WidgetService]
  };
}
