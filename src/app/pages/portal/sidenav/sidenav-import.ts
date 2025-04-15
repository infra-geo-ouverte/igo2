/**
 * Ce fichier TEMPORAIRE permet de corriger un problème de tree-shaking
 * https://github.com/infra-geo-ouverte/igo2/issues/1178
 */
import { ToolComponent } from '@igo2/common/tool';
import {
  AboutToolComponent,
  ActiveOgcFilterToolComponent,
  ActiveTimeFilterToolComponent,
  AdvancedMapToolComponent,
  CatalogBrowserToolComponent,
  CatalogLibraryToolComponent,
  ContextEditorToolComponent,
  ContextManagerToolComponent,
  ContextPermissionManagerToolComponent,
  ContextShareToolComponent,
  DataIssueReporterToolComponent,
  DirectionsToolComponent,
  DrawingToolComponent,
  ImportExportToolComponent,
  MapDetailsToolComponent,
  MapLegendToolComponent,
  MapProximityToolComponent,
  MapToolComponent,
  MapToolsComponent,
  MeasurerToolComponent,
  OgcFilterToolComponent,
  PrintToolComponent,
  SearchResultsToolComponent,
  SpatialFilterToolComponent,
  TimeFilterToolComponent
} from '@igo2/integration';

// Prevent Tree-Shaking with Explicit Imports
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _TOOLS = [
  ToolComponent,
  AboutToolComponent,
  CatalogBrowserToolComponent,
  CatalogLibraryToolComponent,
  ContextEditorToolComponent,
  ContextManagerToolComponent,
  ContextPermissionManagerToolComponent,
  ContextShareToolComponent,
  DirectionsToolComponent,
  DrawingToolComponent,
  ActiveOgcFilterToolComponent,
  ActiveTimeFilterToolComponent,
  OgcFilterToolComponent,
  SpatialFilterToolComponent,
  TimeFilterToolComponent,
  DataIssueReporterToolComponent,
  ImportExportToolComponent,
  AdvancedMapToolComponent,
  MapDetailsToolComponent,
  MapLegendToolComponent,
  MapProximityToolComponent,
  MapToolComponent,
  MapToolsComponent,
  MeasurerToolComponent,
  PrintToolComponent,
  SearchResultsToolComponent
];

export function importAllTools() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const tool of _TOOLS) {
    // @WORKAROUND Empty iteration to prevent tree shaking
  }
}
