import { Context } from '../../context/shared/context.interface';

export function activeContext (state: Context = null, {type, payload}) {
  switch (type) {
    case 'SET_CONTEXT':
      return Object.assign({}, payload);
    default:
      return state;
  }
};
