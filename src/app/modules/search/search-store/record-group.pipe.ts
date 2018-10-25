import { Pipe, PipeTransform } from '@angular/core';

import { Record } from '../../data/shared/data.interface';

@Pipe({
  name: 'recordGroup'
})
export class RecordGroupPipe implements PipeTransform {
  transform(value: Record[], args?: any): any {
    const sourceAndRecords = {};

    value.forEach((record: Record) => {
      const source = record.provider;
      const sourceId = source.getId();
      if (sourceAndRecords[sourceId] === undefined) {
        sourceAndRecords[sourceId] = new Object({
          source: source,
          records: []
        });
      }
      sourceAndRecords[sourceId].records.push(record);
    });

    return Object.values(sourceAndRecords);
  }
}
