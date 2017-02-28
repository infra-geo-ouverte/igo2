import { Context } from '../../context/shared/context.interface';

export function contextsList(state: Context[] = [], {type, payload}) {
  switch (type) {
    case 'SET_CONTEXTS':
      return payload;
    default:
      return state;
  }
};
