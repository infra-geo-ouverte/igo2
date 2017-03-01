import { Context } from '../../context/shared/context.interface';

export function editedContext (state: Context = null, {type, payload}) {
  switch (type) {
    case 'EDIT_CONTEXT':
      return Object.assign({}, payload);
    default:
      return state;
  }
};
