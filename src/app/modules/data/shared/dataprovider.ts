import { Observable } from 'rxjs';

import { Record } from './data.interface';


export abstract class DataProvider {

  abstract getId(): string;

}
