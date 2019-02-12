import t from 'typy';

import { EntityKey } from './entity.interfaces';

/**
 * Get an entity's named property. Nested properties are supported
 * with the dotted notation. (i.e 'author.name')
 *
 * Note: this method is a 'best attempt' at getting an entity's property.
 * It fits the most common cases but you might need to explicitely define
 * a property getter when using an EntityStore, for example.
 * @param entity Entity
 * @param property Property name
 * @returns Property value
 */
export function getEntityProperty(entity: object, property: string): any {
  return t(entity, property).safeObject;
}

/**
 * Get an entity's id. An entity's id can be one of:
 * 'entity.meta.id', 'entity.meta.idProperty' or 'entity.id'.
 *
 * Note: See the note in the 'getEntityProperty' documentation.
 * @param entity Entity
 * @returns Entity id
 */
export function getEntityId(entity: object): EntityKey {
  const meta = (entity as any).meta || {};
  return meta.id ? meta.id : getEntityProperty(entity, meta.idProperty || 'id');
}

/**
 * Get an entity's title. An entity's title can be one of:
 * 'entity.meta.title', 'entity.meta.titleProperty' or 'entity.title'.
 * @param entity Entity
 * @returns Entity title
 */
export function getEntityTitle(entity: object): string {
  const meta = (entity as any).meta || {};
  return meta.title ? meta.title : getEntityProperty(entity, meta.titleProperty || 'title');
}

/**
 * Get an entity's HTML title. An entity's HTML title can be one of:
 * 'entity.meta.titleHtml', 'entity.meta.titleHtmlProperty' or 'entity.titleHtml'.
 * @param entity Entity
 * @returns Entity HTML title
 */
export function getEntityTitleHtml(entity: object): string {
  const meta = (entity as any).meta || {};
  return meta.titleHtml ? meta.titleHtml : getEntityProperty(entity, meta.titleHtmlProperty || 'titleHtml');
}

/**
 * Get an entity's icon. An entity's icon can be one of:
 * 'entity.meta.icon', 'entity.meta.iconProperty' or 'entity.icon'.
 * @param entity Entity
 * @returns Entity icon
 */
export function getEntityIcon(entity: object): string {
  const meta = (entity as any).meta || {};
  return meta.icon ? meta.icon : getEntityProperty(entity, meta.iconProperty || 'icon');
}

/**
 * Get an entity's revision.
 * @param entity Entity
 * @returns Entity revision
 */
export function getEntityRevision(entity: object): number {
  const meta = (entity as any).meta || {};
  return meta.revision || 0;
}
