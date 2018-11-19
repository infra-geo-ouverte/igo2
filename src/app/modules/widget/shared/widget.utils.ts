import { Entity } from '../../entity/shared/entity.interface';
import { Widget } from './widget.interface';

export function widgetToEntity(widget: Widget): Entity<Widget> {
  return {
    rid: widget.title,
    data: widget,
    meta: {
      idProperty: 'id',
      titleProperty: 'title',
      iconProperty: 'icon'
    }
  };
}
