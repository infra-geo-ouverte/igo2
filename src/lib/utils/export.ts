import {
  getEntityProperty,
  EntityTableColumn,
  EntityTableColumnRenderer
} from '@igo2/common';

/**
 * Export array to CSV
 *
 * @param rows Array of arrays to export as CSV
 * @param separator Cell separator
 */
export function exportToCSV(rows: any[][], fileName: string, separator: string = ';') {
  const lines = rows.map((row: any[][], index: number) => row.join(separator));
  const csvContent = lines.join('\n');
  downloadContent(csvContent, 'text/csv;charset=utf-8', fileName);
}

/**
 * Return an array of values from an array of entities.
 *
 * @param entities Array of entities
 * @param scolumns Columns definition of the output data
 */
export function entitiesToRowData(entities: object[], columns: EntityTableColumn[]) {
  return entities.map((entity: object) => {
    return columns.map((column: EntityTableColumn) => {
      let valueAccessor;
      if (column.renderer === undefined || column.renderer === EntityTableColumnRenderer.Default) {
        valueAccessor = column.valueAccessor;
      }
      valueAccessor = valueAccessor ? valueAccessor : getEntityProperty;
      return valueAccessor(entity, column.name);
    });
  });
}

/**
 * Trigger download of a file
 *
 * @param content File content
 * @param mimeType File mime type
 * @param fileName File name
 */

export function downloadContent(content: string, mimeType: string, fileName: string) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:${mimeType},${encodeURIComponent(content)}`
  );
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
