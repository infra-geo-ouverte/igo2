

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

export const ClientSchemaElementSaverWidget =
  new InjectionToken<Widget>('ClientSchemaElementSaverWidget');
export const ClientSchemaElementSurfaceCreateWidget =
  new InjectionToken<Widget>('ClientSchemaElementSurfaceCreateWidget');
export const ClientSchemaElementSurfaceUpdateWidget =
  new InjectionToken<Widget>('ClientSchemaElementSurfaceUpdateWidget');

export function provideClientSchemaElementSaverWidget() {
  return {
    provide:  ClientSchemaElementSaverWidget,
    useFactory: (widgetService: WidgetService) => {
      return widgetService.create(ClientSchemaElementSaverComponent);
    },
    deps: [WidgetService]
  };
}

export function provideClientSchemaElementSurfaceCreateWidget() {
  return {
    provide:  ClientSchemaElementSurfaceCreateWidget,
    useFactory: (widgetService: WidgetService) => {
      return widgetService.create(ClientSchemaElementSurfaceCreateFormComponent);
    },
    deps: [WidgetService]
  };
}

export function provideClientSchemaElementSurfaceUpdateWidget() {
  return {
    provide:  ClientSchemaElementSurfaceUpdateWidget,
    useFactory: (widgetService: WidgetService) => {
      return widgetService.create(ClientSchemaElementSurfaceUpdateFormComponent);
    },
    deps: [WidgetService]
  };
}
