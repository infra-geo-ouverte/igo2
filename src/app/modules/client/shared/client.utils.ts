import { Entity } from '../../entity/shared/entity.interface';
import { ClientSchema } from './client.interface';

export function clientSchemaToEntity(schema: ClientSchema): Entity<ClientSchema> {
  return {
    rid: schema.id,
    data: schema,
    meta: {
      titleProperty: 'id'
    }
  };
}
