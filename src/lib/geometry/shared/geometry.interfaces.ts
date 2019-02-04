import OlGeometryType from 'ol/geom/GeometryType';

import { IgoMap } from 'src/lib/map/shared/map';

import { FormFieldInputs } from 'src/lib/form';

export interface GeometryFormFieldInputs extends FormFieldInputs {
  map: IgoMap;
  geometryType: OlGeometryType;
  tooltip?: string;
}
