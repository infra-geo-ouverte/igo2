

import { InjectionToken } from '@angular/core';

import { Widget, WidgetService } from '@igo2/common';

import {
  ClientSchemaElementSaverComponent
} from '../schema-element-saver/client-schema-element-saver.component';
import {
  ClientSchemaElementCreateFormComponent
} from '../schema-element-create-form/client-schema-element-create-form.component';
import {
  ClientSchemaElementUpdateFormComponent
} from '../schema-element-update-form/client-schema-element-update-form.component';
import {
  ClientSchemaElementSliceFormComponent
} from '../schema-element-slice-form/client-schema-element-slice-form.component';

export const ClientSchemaElementSaverWidget =
  new InjectionToken<Widget>('ClientSchemaElementSaverWidget');
export const ClientSchemaElementCreateWidget =
  new InjectionToken<Widget>('ClientSchemaElementCreateWidget');
export const ClientSchemaElementUpdateWidget =
  new InjectionToken<Widget>('ClientSchemaElementUpdateWidget');
export const ClientSchemaElementSliceWidget =
  new InjectionToken<Widget>('ClientSchemaElementSliceWidget');

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
