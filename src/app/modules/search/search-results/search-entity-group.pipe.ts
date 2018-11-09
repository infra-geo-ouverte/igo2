import { Pipe, PipeTransform } from '@angular/core';

import { Entity } from '../../entity/shared/entity.interface';

@Pipe({
  name: 'searchEntityGroup'
})
export class SearchEntityGroupPipe implements PipeTransform {
  transform(value: Entity[], args?: any): any {
    const sourceAndEntities = {};

    value.forEach((entity: Entity) => {
      const source = entity.provider;
      const sourceId = source.getId();
      if (sourceAndEntities[sourceId] === undefined) {
        sourceAndEntities[sourceId] = new Object({
          source: source,
          entities: []
        });
      }
      sourceAndEntities[sourceId].entities.push(entity);
    });

    return Object.values(sourceAndEntities);
  }
}
