import { Media } from './../core/media.service';

export const browserMedia = (state: Media = null, {type, payload}) => {
  switch (type) {
    case 'SET_MEDIA':
      return payload;
    default:
      return state;
  }
};
