import t from 'typy';

import { ObjectUtils } from '@igo2/utils';

import { Entity, EntityFilterClause, State } from './entity.interfaces';

export function entitiesAreTheSame(entity1: Entity, entity2: Entity | undefined): boolean {
  if (entity2 === undefined) {
    return false;
  }
  return getEntityId(entity1) === getEntityId(entity2);
}

export function getEntityProperty(entity: Entity, property): any {
  return t(entity, property).safeObject;
}

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

export function getEntityRevision(entity: Entity): number {
  const meta = entity.meta || {};
  return meta.revision || 0;
}

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
