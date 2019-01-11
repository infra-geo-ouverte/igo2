import t from 'typy';

import { ObjectUtils } from '@igo2/utils';

import { Entity, EntityFilterClause, State } from './entity.interfaces';

/**
 * Return true if two entities are the same by reference or by id.
 * @param entity1: First entity
 * @param entity2: Second entity
 * @returns True if entities are the same
 */
export function entitiesAreTheSame(entity1: Entity, entity2: Entity | undefined): boolean {
  if (entity2 === undefined) {
    return false;
  }
  return getEntityId(entity1) === getEntityId(entity2);
}

/**
 * Get an entity's property. A property can be nested if it's name
 * contains dots. (i.e 'author.name')
 * @param entity: Entity
 * @param property: Property name
 * @returns Property value
 */
export function getEntityProperty(entity: Entity, property: string): any {
  return t(entity, property).safeObject;
}

/**
 * Get an entity's id. An entity's id can be one of:
 * 'entity.meta.id', 'entity.meta.idProperty' or 'entity.id'.
 * @param entity: Entity
 * @returns Entity id
 */
export function getEntityId(entity: Entity): string {
  const meta = entity.meta || {};

  let id;
  if (meta.id !== undefined) {
    id = meta.id;
  } else {
    const idProperty = meta.idProperty || 'id';
    id = getEntityProperty(entity, idProperty);
  }

  return id === undefined ? undefined : String(id);
}

/**
 * Get an entity's title. An entity's title can be one of:
 * 'entity.meta.title', 'entity.meta.titleProperty' or 'entity.title'.
 * @param entity: Entity
 * @returns Entity title
 */
export function getEntityTitle(entity: Entity): string {
  const meta = entity.meta || {};

  let title;
  if (meta.title !== undefined) {
    title = meta.title;
  } else {
    const titleProperty = meta.titleProperty || 'title';
    title = getEntityProperty(entity, titleProperty);
  }

  return title;
}

/**
 * Get an entity's HTML title. An entity's HTML title can be one of:
 * 'entity.meta.titleHtml', 'entity.meta.titleHtmlProperty' or 'entity.titleHtml'.
 * @param entity: Entity
 * @returns Entity HTML title
 */
export function getEntityTitleHtml(entity: Entity): string {
  const meta = entity.meta || {};

  let titleHtml;
  if (meta.titleHtml !== undefined) {
    titleHtml = meta.titleHtml;
  } else {
    const titleHtmlProperty = meta.titleProperty || 'titleHtml';
    titleHtml = getEntityProperty(entity, titleHtmlProperty);
  }

  return titleHtml;
}

/**
 * Get an entity's icon. An entity's icon can be one of:
 * 'entity.meta.icon', 'entity.meta.iconProperty' or 'entity.icon'.
 * @param entity: Entity
 * @returns Entity icon
 */
export function getEntityIcon(entity: Entity): string {
  const meta = entity.meta || {};

  let icon;
  if (meta.icon !== undefined) {
    icon = meta.icon;
  } else {
    const iconProperty = meta.iconProperty || 'icon';
    icon = getEntityProperty(entity, iconProperty);
  }

  return icon;
}

/**
 * Get an entity's revision.
 * @param entity: Entity
 * @returns Entity revision
 */
export function getEntityRevision(entity: Entity): number {
  const meta = entity.meta || {};
  return meta.revision || 0;
}

/**
 * Sort entities by property
 * @param entities: Entities
 * @param property: Property to sort by
 * @param direction: Either 'asc' or 'desc'
 * @returns A new sorted array of entities
 */
export function sortEntities(
  entities: Entity[],
  property: string,
  direction: string
): Entity[] {
  return entities.sort((entity1: Entity, entity2: Entity) => {
    const property1 = getEntityProperty(entity1, property);
    const property2 = getEntityProperty(entity2, property);
    return ObjectUtils.naturalCompare(property1, property2, direction);
  });
}

/**
 * Filter entities by property or state
 * @param entities: Entities
 * @param clauses: Array of filtering clauses
 * @param stateGetter: Method to retrieve an entity's state
 * @returns A new filtered array of entities
 */
export function filterEntities(
  entities: Entity[],
  clauses: EntityFilterClause[],
  stateGetter: (entity: Entity) => State
): Entity[] {
  if (clauses.length === 0) {
    return entities;
  }
  return entities.filter((entity: Entity) => {
    const state = stateGetter(entity);
    return clauses.every((clause: EntityFilterClause) => clause(entity, state));
  });
}
