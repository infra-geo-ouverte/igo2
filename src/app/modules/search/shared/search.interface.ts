import { Observable } from 'rxjs';

import { Record } from '../../data/shared/data.interface';
import { SearchSource } from './sources';

export interface Research {
  request: Observable<Record[]>;
  reverse: boolean;
  source: SearchSource;
}
