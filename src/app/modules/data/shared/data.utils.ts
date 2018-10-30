import t from 'typy';

import { Record } from './data.interface';

export function recordsAreTheSame(record1: Record, record2: Record | undefined): boolean {
  if (record2 === undefined) {
    return false;
  }
  return record1.rid === record2.rid;
}

export function getRecordId(record: Record): string | number{
  let id;

  const meta = record.meta;
  if (meta.id !== undefined) {
    id = meta.id;
  } else if (meta.idProperty !== undefined) {
    id = t(record.data, meta.idProperty).safeObject;
  }

  return id;
}

export function getRecordTitle(record: Record): string {
  let title;

  const meta = record.meta;
  if (meta.title !== undefined) {
    title = meta.title;
  } else if (meta.titleProperty !== undefined) {
    title = t(record.data, meta.titleProperty).safeObject;
  }

  return title;
}

export function getRecordTitleHtml(record: Record): string {
  let title;

  const meta = record.meta;
  if (meta.titleHtml !== undefined) {
    title = meta.titleHtml;
  } else if (meta.titleHtmlProperty !== undefined) {
    title = t(record.data, meta.titleHtmlProperty).safeObject;
  }

  return title;
}

export function getRecordIcon(record: Record): string {
  let icon;

  const meta = record.meta;
  if (meta.icon !== undefined) {
    icon = meta.icon;
  } else if (meta.iconProperty !== undefined) {
    icon = t(record.data, meta.iconProperty).safeObject;
  }

  return icon;
}
