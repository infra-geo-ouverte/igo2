import { Entity } from '../../entity/shared/entity.interface';
import { Editor } from './editor';

export function editorToEntity(
    editor: Editor
): Entity<Editor> {
  return {
    rid: editor.id,
    data: editor,
    meta: {
      id: editor.id,
      title: editor.title
    }
  };
}
