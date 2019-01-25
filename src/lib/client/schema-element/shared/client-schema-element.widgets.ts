

import { InjectionToken } from '@angular/core';

import { Widget, WidgetService } from 'src/lib/widget';

import {
  ClientSchemaElementSaverComponent
} from '../schema-element-saver/client-schema-element-saver.component';
import {
  ClientSchemaElementSurfaceCreateFormComponent
} from '../schema-element-surface-create-form/client-schema-element-surface-create-form.component';
import {
  ClientSchemaElementSurfaceUpdateFormComponent
} from '../schema-element-surface-update-form/client-schema-element-surface-update-form.component';
import {
  ClientSchemaElementSurfaceSliceFormComponent
} from '../schema-element-surface-slice-form/client-schema-element-surface-slice-form.component';

export const ClientSchemaElementSaverWidget =
  new InjectionToken<Widget>('ClientSchemaElementSaverWidget');
export const ClientSchemaElementSurfaceCreateWidget =
  new InjectionToken<Widget>('ClientSchemaElementSurfaceCreateWidget');
export const ClientSchemaElementSurfaceUpdateWidget =
  new InjectionToken<Widget>('ClientSchemaElementSurfaceUpdateWidget');
export const ClientSchemaElementSurfaceSliceWidget =
  new InjectionToken<Widget>('ClientSchemaElementSurfaceSliceWidget');

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

export function clientSchemaElementSurfaceCreateWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaElementSurfaceCreateFormComponent);
}

export function provideClientSchemaElementSurfaceCreateWidget() {
  return {
    provide:  ClientSchemaElementSurfaceCreateWidget,
    useFactory: clientSchemaElementSurfaceCreateWidgetFactory,
    deps: [WidgetService]
  };
}

export function clientSchemaElementSurfaceUpdateWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaElementSurfaceUpdateFormComponent);
}

export function provideClientSchemaElementSurfaceUpdateWidget() {
  return {
    provide:  ClientSchemaElementSurfaceUpdateWidget,
    useFactory: clientSchemaElementSurfaceUpdateWidgetFactory,
    deps: [WidgetService]
  };
}

export function clientSchemaElementSurfaceSliceWidgetFactory(widgetService: WidgetService) {
  return widgetService.create(ClientSchemaElementSurfaceSliceFormComponent);
}

export function provideClientSchemaElementSurfaceSliceWidget() {
  return {
    provide:  ClientSchemaElementSurfaceSliceWidget,
    useFactory: clientSchemaElementSurfaceSliceWidgetFactory,
    deps: [WidgetService]
  };
}
