import t from 'typy';

import { ObjectUtils } from '@igo2/utils';

import { Entity } from './entity.interface';

export function entitiesAreTheSame(entity1: Entity, entity2: Entity | undefined): boolean {
  if (entity2 === undefined) {
    return false;
  }
  return entity1.rid === entity2.rid;
}

export function getEntityId(entity: Entity): string | number {
  let id;

  const meta = entity.meta;
  if (meta.id !== undefined) {
    id = meta.id;
  } else if (meta.idProperty !== undefined) {
    id = t(entity.data, meta.idProperty).safeObject;
  }

  return id;
}

export function getEntityTitle(entity: Entity): string {
  let title;

  const meta = entity.meta;
  if (meta.title !== undefined) {
    title = meta.title;
  } else if (meta.titleProperty !== undefined) {
    title = t(entity.data, meta.titleProperty).safeObject;
  }

  return title;
}

export function getEntityTitleHtml(entity: Entity): string {
  let title;

  const meta = entity.meta;
  if (meta.titleHtml !== undefined) {
    title = meta.titleHtml;
  } else if (meta.titleHtmlProperty !== undefined) {
    title = t(entity.data, meta.titleHtmlProperty).safeObject;
  }

  return title;
}

export function getEntityIcon(entity: Entity): string {
  let icon;

  const meta = entity.meta;
  if (meta.icon !== undefined) {
    icon = meta.icon;
  } else if (meta.iconProperty !== undefined) {
    icon = t(entity.data, meta.iconProperty).safeObject;
  }

  return icon;
}

export function sortEntities(
  entities: Entity[],
  property: string,
  direction: string
) {
  return entities.sort((entity1: Entity, entity2: Entity) => {
    const property1 = t(entity1.data, property).safeObject;
    const property2 = t(entity2.data, property).safeObject;
    return ObjectUtils.naturalCompare(property1, property2, direction);
  });
}
