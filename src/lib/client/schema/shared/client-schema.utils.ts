import { ClientSchema } from './client-schema.interfaces';

export function getClientSchemaTitle(schema: ClientSchema): string {
  return `${schema.id} - ${schema.type} - ${schema.annee}`;
}
