import { Record } from './data.interface';

export function recordsAreTheSame(record1: Record, record2: Record | undefined): boolean {
  if (record2 === undefined) {
    return false;
  }
  return record1.rid === record2.rid;
}

export function getRecordTitle(record: Record): string {
  let title = record.id;

  const meta = record.meta;
  if (meta.title !== undefined) {
    title = meta.title;
  } else if (meta.titleProperty !== undefined) {
    title = record.data[meta.titleProperty];
  }

  return title;
}

export function getRecordTitleHtml(record: Record): string {
  let title;

  const meta = record.meta;
  if (meta.titleHtml !== undefined) {
    title = meta.titleHtml;
  } else if (meta.titleHtmlProperty !== undefined) {
    title = record.data[meta.titleHtmlProperty];
  }

  return title;
}

export function getRecordIcon(record: Record): string {
  let icon;

  const meta = record.meta;
  if (meta.icon !== undefined) {
    icon = meta.icon;
  } else if (meta.iconProperty !== undefined) {
    icon = record.data[meta.iconProperty];
  }

  return icon;
}
