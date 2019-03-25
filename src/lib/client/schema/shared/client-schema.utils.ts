import { ClientSchema } from './client-schema.interfaces';

export function getClientSchemaTitle(schema: ClientSchema): string {
  if (schema.type === 'PLP') {
    return `${schema.id} - ${schema.type} - ${schema.annee}`;
  }
  return `${schema.id} - ${schema.type}`;
}
